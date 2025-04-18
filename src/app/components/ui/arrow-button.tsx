"use client"

import React from 'react'
import { cn } from '../lib/utils'

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right'
  variant?: 'light' | 'dark'
}

export const ArrowButton = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ className, direction, variant = 'light', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative w-[60px] h-[60px] rounded-full transition-all duration-300",
          variant === 'light'
            ? "bg-white hover:shadow-lg hover:scale-105"
            : "bg-[#333333] hover:bg-[#444444] hover:shadow-lg hover:scale-105",
          disabled && "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {direction === 'left' ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform scale-75 md:scale-100"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke={variant === 'light' ? "#333333" : "#FFFFFF"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform scale-75 md:scale-100"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke={variant === 'light' ? "#333333" : "#FFFFFF"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>
    )
  }
)

ArrowButton.displayName = "ArrowButton"
