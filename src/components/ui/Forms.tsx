import React from "react";
import { cn } from "@/src/lib/utils";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  children,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "text-gray-600 hover:bg-gray-100",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-5 py-2.5 text-sm font-bold",
    lg: "px-8 py-4 text-base font-bold",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type InputProps = React.ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

type SelectProps = React.ComponentPropsWithoutRef<"select">;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
