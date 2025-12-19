import { useState, FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../../convex/_generated/api";

// Helper to manually ensure user profile exists with firstName/lastName
// This is needed when we bypass the signUp wrapper
async function ensureUserProfile(firstName: string, lastName: string, ensureUserMutation: any) {
  // Wait for auth to propagate
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Retry a few times in case auth isn't ready yet
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await ensureUserMutation({
        firstName,
        lastName,
        name: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || undefined,
      });
      return; // Success
    } catch (err: any) {
      if (err.message?.includes("Not authenticated") && attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      throw err;
    }
  }
}

export default function CreateUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const authActions = useAuthActions();
  const { user } = useAuth();
  const deleteOrphanedUser = useMutation(api.users.deleteOrphanedUser);
  const ensureUser = useMutation(api.users.ensureUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!authActions) {
      setError("Auth actions not available");
      return;
    }

    setIsLoading(true);
    
    // Store admin email before signing out (needed for error handling and redirect)
    const adminEmail = user?.email;

    try {
      // Step 1: Clean up any orphaned user profiles (from previous failed attempts)
      // This prevents conflicts when signing up
      try {
        await deleteOrphanedUser({ email });
      } catch (err) {
        // Ignore errors - user might not exist, which is fine
      }

      // Step 2: Sign out first (we can't sign up while logged in)
      await authActions.signOut();
      // Wait longer to ensure signout completes and auth state is fully cleared
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 3: Create auth account using authActions directly (bypasses AuthContext wrapper)
      // This ensures we're using fresh auth state
      // Wrap in try-catch to handle the specific null _id error
      try {
        await authActions.signIn("password", {
          email,
          password,
          flow: "signUp",
        });
      } catch (signupError: any) {
        // If we get the "Cannot read properties of null" error, it means there's
        // an orphaned/inconsistent auth account. Try to provide helpful guidance.
        if (signupError?.message?.includes("Cannot read properties of null") || 
            signupError?.message?.includes("_id")) {
          throw new Error(
            `Cannot create user account for ${email}. ` +
            `There may be an existing auth account in an inconsistent state. ` +
            `Please try a different email address, or the account may need to be manually cleaned up in the Convex dashboard. ` +
            `Original error: ${signupError.message}`
          );
        }
        throw signupError;
      }

      // Step 4: Manually ensure user profile exists with firstName/lastName
      // (normally done by AuthContext's useEffect, but we bypassed that)
      await ensureUserProfile(firstName, lastName, ensureUser);

      // Success! User account created
      // Note: The signup automatically signs us in as the new user
      // We'll sign out immediately so the admin can sign back in
      if (authActions) {
        await authActions.signOut();
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setSuccess(`User ${email} created successfully! You will need to sign back in as admin.`);
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      
      // Redirect to sign in after a moment
      setTimeout(() => {
        const message = adminEmail 
          ? `User ${email} created successfully! Please sign back in with your admin account (${adminEmail}).`
          : `User ${email} created successfully! Please sign back in with your admin account.`;
        sessionStorage.setItem("userCreatedMessage", message);
        if (adminEmail) {
          sessionStorage.setItem("adminEmail", adminEmail);
        }
        window.location.href = "/signin";
      }, 1500);
      
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : "Failed to create user";
      
      // Provide more helpful error messages
      if (errorMessage.includes("Cannot read properties of null")) {
        errorMessage = `Cannot create user: There may be an existing auth account in an inconsistent state. Try using a different email, or the account may need to be cleaned up manually in the database.`;
      } else if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
        errorMessage = `User with email ${email} already exists. They can sign in with their password.`;
      }
      
      setError(errorMessage);
      
      // If we signed out but signup failed, redirect to sign in
      // The admin will need to sign back in manually
      if (errorMessage.includes("sign") || errorMessage.includes("auth") || errorMessage.includes("Cannot read")) {
        setTimeout(() => {
          const message = adminEmail 
            ? `Failed to create user. Please sign back in with your admin account (${adminEmail}).`
            : `Failed to create user. Please sign back in with your admin account.`;
          sessionStorage.setItem("userCreatedMessage", message);
          if (adminEmail) {
            sessionStorage.setItem("adminEmail", adminEmail);
          }
          window.location.href = "/signin";
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          Create New User
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create a new user account. The user will be able to sign in with the provided email and password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg dark:bg-green-900/20 dark:text-green-400">
              {success}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <Label>
                First Name<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="sm:col-span-1">
              <Label>
                Last Name<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <Label>
              Email<span className="text-error-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label>
              Password<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>
          <div>
            <Button className="w-full" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Creating user..." : "Create User"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

