"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      router.push("/auth/login");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">FoundersKick</p>
        <h1 className="mt-3 font-display text-3xl text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-ink/70">
          Join a curated community of ambitious founders.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ari Founder"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="founder@startup.com"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/70">
          Already have an account?{" "}
          <Link className="font-semibold text-ember" href="/auth/login">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
