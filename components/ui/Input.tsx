"use client";

import { cn } from "@/lib/utils";
import React, { useState, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;

  size?: "sm" | "md" | "lg";

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  className?: string;
  inputClassName?: string;

  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const sizeStyles = {
  sm: "h-8 text-sm px-3",
  md: "h-10 text-sm px-4",
  lg: "h-12 text-base px-4",
};

const iconSpacing = {
  sm: {
    left: "pl-9",
    right: "pr-9",
  },
  md: {
    left: "pl-10",
    right: "pr-10",
  },
  lg: {
    left: "pl-11",
    right: "pr-11",
  },
};

export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  className,
  inputClassName,
  icon,
  iconPosition = "left",
  size = "md",
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const computedType = isPassword ? (showPassword ? "text" : "password") : type;

  const hasLeftIcon = icon && iconPosition === "left";
  const hasRightIcon = isPassword || (icon && iconPosition === "right");

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {/* LABEL */}
      {label && (
        <label
          className={cn(
            "text-xs tracking-widest transition-colors",
            isFocused ? "text-white" : "text-white/60",
          )}
        >
          {label}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div className="relative w-full">
        {/* LEFT ICON */}
        {hasLeftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </span>
        )}

        {/* INPUT */}
        <input
          type={computedType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={cn(
            "w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/60 outline-none transition",

            // focus state
            isFocused && "border-white/30",

            // size
            sizeStyles[size],

            // icon spacing
            hasLeftIcon && iconSpacing[size].left,
            hasRightIcon && iconSpacing[size].right,

            inputClassName,
          )}
        />

        {/* RIGHT ICON (non-password) */}
        {!isPassword && icon && iconPosition === "right" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </span>
        )}

        {/* PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
