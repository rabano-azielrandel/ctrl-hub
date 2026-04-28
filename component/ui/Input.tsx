"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  className?: string;
  inputClassName?: string;

  focus?: boolean;
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
  focus,
}: InputProps) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const computedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          className={cn(
            "text-xs tracking-widest transition-colors",
            focus ? "text-white" : "text-white/60",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={computedType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/60 outline-none transition",
            focus && "bg-white/10 border-white/30",
            isPassword && "pr-12", // space for icon
            inputClassName,
          )}
        />

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
