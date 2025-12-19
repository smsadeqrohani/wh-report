import { createContext, useContext, ReactNode, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

interface User {
  _id: Id<"users">;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  image?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authActions = useAuthActions();
  
  if (!authActions) {
    throw new Error("useAuthActions returned undefined. Make sure ConvexAuthProvider is set up correctly.");
  }
  
  const { signIn: signInAction, signOut: signOutAction } = authActions;
  // Use useAuthToken to detect authentication state directly from ConvexAuthProvider
  // This is more reliable than queries which might not update immediately
  const authToken = useAuthToken();
  const isAuthenticatedQuery = useQuery(api.users.checkAuth);
  const user = useQuery(api.users.getCurrentUser);
  const ensureUser = useMutation(api.users.ensureUser);
  
  // Determine authentication state
  // Use authToken as the primary source - it updates immediately after sign-in
  // Fall back to checkAuth query and user query for additional checks
  const hasAuthToken = authToken !== null && authToken !== undefined;
  
  // Store signup data temporarily to use in useEffect
  const signupDataRef = useRef<{ firstName?: string; lastName?: string } | null>(null);
  // Track if we've already tried to ensure user to avoid infinite loops
  const ensuringUserRef = useRef(false);

  // Automatically ensure user exists when authenticated but user profile doesn't exist
  // Also update user if they exist but don't have firstName/lastName and we have signup data
  useEffect(() => {
    // IMPORTANT: Wait for server-side auth confirmation (isAuthenticatedQuery === true)
    // before calling mutations. Mutations need the auth context to be ready on the server.
    // hasAuthToken only indicates client-side token exists, but server might not be ready yet.
    const isAuth = isAuthenticatedQuery === true;
    const signupData = signupDataRef.current;
    const hasSignupData = signupData?.firstName || signupData?.lastName;
    
    // Only run if authenticated (server-side confirmed) and not already ensuring
    if (!isAuth || ensuringUserRef.current) return;
    
    // Case 1: User profile doesn't exist - create it
    if (user === null) {
      ensuringUserRef.current = true;
      
      // Retry function with exponential backoff
      const tryEnsureUser = (attempt: number = 1) => {
        const delay = Math.min(1000 * attempt, 3000); // 1s, 2s, 3s
        
        setTimeout(() => {
          ensureUser({
            firstName: signupData?.firstName,
            lastName: signupData?.lastName,
            name: signupData?.firstName && signupData?.lastName 
              ? `${signupData.firstName} ${signupData.lastName}` 
              : signupData?.firstName || signupData?.lastName || undefined
          })
          .then(() => {
            signupDataRef.current = null;
            ensuringUserRef.current = false;
          })
          .catch((error) => {
            if (error.message?.includes("Not authenticated") && attempt < 3) {
              tryEnsureUser(attempt + 1);
            } else {
              console.error("Error ensuring user profile:", error);
              ensuringUserRef.current = false;
            }
          });
        }, delay);
      };
      
      tryEnsureUser(1);
    }
    // Case 2: User exists but doesn't have firstName/lastName and we have signup data - update it
    else if (user && hasSignupData && (!user.firstName || !user.lastName)) {
      ensuringUserRef.current = true;
      
      setTimeout(() => {
        ensureUser({
          firstName: signupData?.firstName,
          lastName: signupData?.lastName,
          name: signupData?.firstName && signupData?.lastName 
            ? `${signupData.firstName} ${signupData.lastName}` 
            : undefined
        })
        .then(() => {
          signupDataRef.current = null;
          ensuringUserRef.current = false;
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
          ensuringUserRef.current = false;
        });
      }, 1500);
    }
  }, [hasAuthToken, isAuthenticatedQuery, user, ensureUser]);

  const signIn = async (email: string, password: string) => {
    signupDataRef.current = null; // Clear any previous signup data
    ensuringUserRef.current = false; // Reset ensuring flag
    await signInAction("password", { email, password, flow: "signIn" });
    // Don't call ensureUser here - the auth state needs time to propagate
    // The useEffect will handle ensuring user profile once isAuthenticatedQuery becomes true
  };

  const signUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    // Store signup data for useEffect to use
    signupDataRef.current = { firstName, lastName };
    await signInAction("password", { email, password, flow: "signUp" });
    // The useEffect will handle creating the user profile once auth state propagates
  };

  const signOut = async () => {
    await signOutAction();
  };

  const isLoading = isAuthenticatedQuery === undefined && !hasAuthToken;
  // Authenticated if we have a token OR checkAuth is true OR user exists
  const isAuthenticated = hasAuthToken || isAuthenticatedQuery === true || (user !== null && user !== undefined);

  // Debug: log user object to help troubleshoot
  useEffect(() => {
    if (user) {
      console.log("AuthContext - User object:", user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

