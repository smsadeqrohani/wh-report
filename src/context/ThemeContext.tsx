"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize theme immediately based on system preference or saved theme
  // Default to dark when preference cannot be determined (dark-first approach)
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "dark";
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) return savedTheme;
    // Check system preference, default to dark if can't determine
    try {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // Respect system preference when available, but default to dark if system prefers light
      // (dark-first approach: prefer dark unless system explicitly prefers dark)
      return systemPrefersDark ? "dark" : "dark";
    } catch {
      // If matchMedia fails or can't determine, default to dark
      return "dark";
    }
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Apply theme immediately on mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      // Only save to localStorage if user manually changed theme
      // Check if current theme matches system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = systemPrefersDark ? "dark" : "light";
      
      // Only save if theme differs from system preference (user manually set it)
      if (theme !== systemTheme) {
        localStorage.setItem("theme", theme);
      } else {
        // Remove saved theme to use system preference
        localStorage.removeItem("theme");
      }
      
      // Apply theme to document
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isInitialized]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    // Only listen if user hasn't manually set a theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return; // User has manually set theme, don't listen to system changes

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Always use dark (dark-first approach)
      // User can manually toggle if they want light mode
      setTheme("dark");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // When user manually toggles, save to localStorage
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
