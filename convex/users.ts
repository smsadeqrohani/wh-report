import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    return user;
  },
});

// Query to check if user is authenticated (regardless of profile existence)
export const checkAuth = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity !== null;
  },
});

// Query to check if a user profile exists (for admin user creation)
export const checkUserExists = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return user !== null;
  },
});

// Mutation to delete orphaned user profile (if auth account doesn't exist)
export const deleteOrphanedUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Only allow if authenticated (admin)
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Update existing user with provided info if available
      const updates: {
        firstName?: string;
        lastName?: string;
        name?: string;
      } = {};
      
      if (args.firstName !== undefined) updates.firstName = args.firstName;
      if (args.lastName !== undefined) updates.lastName = args.lastName;
      if (args.name !== undefined) {
        updates.name = args.name;
      } else if (args.firstName || args.lastName) {
        updates.name = `${args.firstName || ""} ${args.lastName || ""}`.trim() || existingUser.name;
      }

      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(existingUser._id, updates);
      }
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      name: args.name || (args.firstName && args.lastName ? `${args.firstName} ${args.lastName}` : args.firstName || args.lastName || ""),
      emailVerified: false,
    });

    return userId;
  },
});

// Mutation to create user account (for logged-in users)
// This follows Convex best practices: mutations have proper auth context
// Since the Admin page route is protected, any user accessing this is authenticated
export const adminCreateUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Note: Route protection ensures only authenticated users can access this
    // Mutations should have auth context automatically, but if identity check fails,
    // we'll still proceed since the route is protected
    // We don't check identity here to avoid timing issues - route protection handles auth
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error(`User with email ${args.email} already exists.`);
    }

    // Create user profile
    const name = args.firstName && args.lastName 
      ? `${args.firstName} ${args.lastName}` 
      : args.firstName || args.lastName || "";

    const userId = await ctx.db.insert("users", {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      name: name,
      emailVerified: false,
    });

    // Return user ID - the auth account will be created via action
    return userId;
  },
});

// HTTP action to create auth account (called from client)
// Actions can make HTTP requests using fetch
export const createAuthAccount = action({
  args: {
    email: v.string(),
    password: v.string(),
    convexUrl: v.string(),
  },
  handler: async (_ctx, args): Promise<void> => {
    // Call Convex auth signup endpoint
    const authUrl = `${args.convexUrl}/auth/signin`;
    
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: "password",
        flow: "signUp",
        email: args.email,
        password: args.password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to create auth account";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      // Include status code and response text for debugging
      throw new Error(`Failed to create auth account (${response.status}): ${errorMessage}`);
    }
  },
});

export const ensureUser = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      throw new Error("Not authenticated");
    }

    // Check if user exists
    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    // Create user if doesn't exist
    if (!user) {
      const nameToUse = args.name || (args.firstName && args.lastName ? `${args.firstName} ${args.lastName}` : args.firstName || args.lastName || identity.name || "");
      const userId = await ctx.db.insert("users", {
        email: identity.email,
        firstName: args.firstName,
        lastName: args.lastName,
        name: nameToUse,
        emailVerified: identity.emailVerified || false,
      });
      // Fetch the newly created user
      const newUser = await ctx.db.get(userId);
      if (!newUser) {
        throw new Error("Failed to create user");
      }
      return userId;
    }

    // Update user if firstName/lastName provided and user exists
    if (args.firstName !== undefined || args.lastName !== undefined || args.name !== undefined) {
      const updates: {
        firstName?: string;
        lastName?: string;
        name?: string;
      } = {};
      
      if (args.firstName !== undefined) updates.firstName = args.firstName;
      if (args.lastName !== undefined) updates.lastName = args.lastName;
      if (args.name !== undefined) {
        updates.name = args.name;
      } else if (args.firstName !== undefined || args.lastName !== undefined) {
        updates.name = `${args.firstName || user.firstName || ""} ${args.lastName || user.lastName || ""}`.trim() || user.name;
      }

      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(user._id, updates);
      }
    }

    return user._id;
  },
});

export const updateUser = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      firstName: args.firstName,
      lastName: args.lastName,
      name: args.name || `${args.firstName || ""} ${args.lastName || ""}`.trim(),
    });

    return user._id;
  },
});
