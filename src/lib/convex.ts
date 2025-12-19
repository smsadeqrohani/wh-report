import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "";

// Create client - URL will be set when Convex dev server starts
// If URL is missing, Convex will handle reconnection automatically
export const convex = convexUrl 
  ? new ConvexReactClient(convexUrl)
  : new ConvexReactClient("https://placeholder.convex.cloud");

