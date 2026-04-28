"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={() => console.log("hello")}
      className="min-w-lg min-h-130 flex flex-col centerX p-10 gap-8
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
          focus={focus === "email"}
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
          focus={focus === "password"}
        />
      </div>

      <Button className="hover:-translate-y-[2px] font-semibold">
        Sign in
      </Button>

      <Button variant="secondary">
        <Image src="/icons/google.png" alt="Google" width={18} height={18} />
        Continue with Google
      </Button>
    </form>
  );
}
