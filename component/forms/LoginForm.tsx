"use client";

import { useState } from "react";
import Image from "next/image";

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
      className="min-w-lg min-h-130 flex flex-col centerX p-6 gap-4
        rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 shadow-lg"
    >
      <div className="w-16 h-16 flex rounded-2xl bg-[#8068E7]">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-semibold">Welcome back</h2>
      <p className="text-sm text-white/70">
        Sign in to continue to your workspace
      </p>
      <div className="w-full flex flex-col">
        <span
          className={`${focus === "email" ? "text-[rgba(255,255,255,0.85)]" : ""}`}
        >
          EMAIL
        </span>
        <input
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
        />
      </div>
    </form>
  );
}
