"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, parseJwt } from "../../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    const payload = parseJwt(token);
    if (payload && payload.email) {
      setUserEmail(payload.email);
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-ink/10 bg-white/80 p-10 shadow-lg">
          <div className="h-6 w-32 animate-pulse rounded bg-ink/10" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-ink/10" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 rounded-2xl bg-ink/5 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-ink/10 bg-white/80 p-10 shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Welcome to FoundersKick</h1>
        <p className="mt-3 text-sm text-ink/70">
          {userEmail ? `Signed in as ${userEmail}.` : "You're signed in."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Startups</p>
            <p className="mt-2 text-2xl font-semibold text-ink">12</p>
            <p className="mt-2 text-sm text-ink/60">Watching your growth.</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Connections</p>
            <p className="mt-2 text-2xl font-semibold text-ink">47</p>
            <p className="mt-2 text-sm text-ink/60">Builders in your orbit.</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Opportunities</p>
            <p className="mt-2 text-2xl font-semibold text-ink">5</p>
            <p className="mt-2 text-sm text-ink/60">Active in your pipeline.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/explore"
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-ink"
          >
            Explore Startups
          </Link>
          <Link
            href="/feed"
            className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white"
          >
            Go to Feed
          </Link>
        </div>
      </div>
    </main>
  );
}
