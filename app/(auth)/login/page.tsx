"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: 350,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: "12px 14px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            fontSize: 16,
            outline: "none",
            marginBottom: 2,
            background: "#f9fafb"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: "12px 14px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            fontSize: 16,
            outline: "none",
            marginBottom: 2,
            background: "#f9fafb"
          }}
        />
        {error && <div style={{ color: "#e11d48", fontSize: 15, textAlign: "center" }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            fontSize: 17,
            marginTop: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
            transition: "background 0.2s"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#1d4ed8")}
          onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
        >
          Login
        </button>
        <p style={{ fontSize: 15, textAlign: "center", marginTop: 8 }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: "#2563eb", textDecoration: "underline" }}>Register</a>
        </p>
      </form>
    </div>
  );
} 