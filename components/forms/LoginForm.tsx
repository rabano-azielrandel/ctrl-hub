"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl min-h-130 flex flex-col centerX p-6 sm:p-10 gap-8 mt-16
        rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    >
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#8068E7]">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain invert"
          />
        </div>

        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>

        <p className="text-sm text-white/60">
          Sign in to continue to your workspace
        </p>
      </div>

      {/* Email */}
      <div className="w-full flex flex-col gap-1 ">
        <Input
          label="EMAIL"
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
        />
      </div>

      {/* Password */}
      <div className="w-full flex flex-col gap-1 ">
        <Input
          label="PASSWORD"
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
        />
      </div>

      {error && (
        <div className="w-full flex flex-col gap-1 ">
          <p className="text-sm text-red-500 text-wrap">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="hover:-translate-y-[2px] font-semibold"
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="w-full flex justify-center items-center gap-2">
        <div className="w-full h-0 border border-white/20" />
        <p className="text-nowrap">or continue with</p>
        <div className="w-full h-0 border border-white/20" />
      </div>

      <Button variant="secondary">
        <Image src="/icons/google.png" alt="Google" width={18} height={18} />
        Continue with Google
      </Button>
    </form>
  );
}
