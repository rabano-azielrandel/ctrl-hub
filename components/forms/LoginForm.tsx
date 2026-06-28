"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { login, signup } from "@/app/actions/auth";

type Mode = "login" | "signup";

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setConfirmed(false);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        const result = await signup({ email, password });
        if (result?.confirmEmail) {
          setConfirmed(true);
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex flex-col centerX p-6 sm:p-10 gap-6 mt-16
        rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    >
      {/* Logo + title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#8068E7]">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain invert"
          />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h2>

        <p className="text-sm text-white/60">
          {mode === "login"
            ? "Sign in to continue to your workspace"
            : "Sign up to get started"}
        </p>
      </div>

      {/* Email-confirmed state */}
      {confirmed ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <p className="text-white/80 text-sm leading-relaxed">
            Check your inbox for a confirmation link, then sign in.
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => switchMode("login")}
          >
            Go to sign in
          </Button>
        </div>
      ) : (
        <>
          {/* Email */}
          <div className="w-full">
            <Input
              label="EMAIL"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <Input
              label="PASSWORD"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm password — signup only */}
          {mode === "signup" && (
            <div className="w-full">
              <Input
                label="CONFIRM PASSWORD"
                type="password"
                value={confirmPassword}
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400 text-wrap -mt-2">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="hover:-translate-y-[2px] font-semibold"
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </Button>

          {/* Divider */}
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-px border border-white/20" />
            <p className="text-nowrap text-sm text-white/60">or continue with</p>
            <div className="flex-1 h-px border border-white/20" />
          </div>

          <Button variant="secondary" type="button">
            <Image src="/icons/google.png" alt="Google" width={18} height={18} />
            Continue with Google
          </Button>

          {/* Mode toggle */}
          <p className="text-center text-sm text-white/50">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-white underline underline-offset-2 hover:text-white/80"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-white underline underline-offset-2 hover:text-white/80"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </>
      )}
    </form>
  );
}
