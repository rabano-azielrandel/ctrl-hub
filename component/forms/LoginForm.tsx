"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      className="min-w-lg min-h-130 flex flex-col justify-start items-center p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 shadow-lg"
    >
      <div className="w-16 h-16 flex rounded-2xl bg-[#CFCFCF]">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <h2>Sign In</h2>
    </form>
  );
}
