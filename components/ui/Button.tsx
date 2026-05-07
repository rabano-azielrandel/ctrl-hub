"use client";

import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;

  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";

  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";

  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-center gap-2 font-medium transition-all rounded-xl cursor-pointer",

        // sizes
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-3 text-base",
        size === "lg" && "px-5 py-4 text-lg",

        // variants
        variant === "primary" &&
          "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-90",

        variant === "secondary" &&
          "bg-white/5 border border-white/10 text-white hover:bg-white/10",

        variant === "ghost" && "bg-transparent text-white/70 hover:text-white",

        disabled && "opacity-50 pointer-events-none",

        className,
      )}
    >
      {children}
    </button>
  );
}
