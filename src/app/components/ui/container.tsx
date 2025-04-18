import { cn } from "../lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component that provides consistent max-width and padding
 * across the application.
 * 
 * Using 1440px as the max-width which is a common standard for modern websites
 * with padding to ensure content doesn't touch the edges on large screens.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
