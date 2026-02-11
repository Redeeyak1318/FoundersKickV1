"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch, getAuthToken } from "../../lib/api";

const ExploreSkeleton = () => (
  <div className="grid gap-5 md:grid-cols-2">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="rounded-2xl border border-ink/10 bg-white p-6">
        <div className="h-3 w-16 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-4 w-32 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-ink/10" />
      </div>
    ))}
  </div>
);

export default function Explore() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    apiFetch("/api/startups")
      .then((data) => {
        if (!active) return;
        setStartups(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load startups.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [ready]);

  if (!ready) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
          <div className="h-6 w-28 animate-pulse rounded bg-ink/10" />
          <div className="mt-4 h-8 w-1/2 animate-pulse rounded bg-ink/10" />
          <div className="mt-6">
            <ExploreSkeleton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Explore</p>
            <h1 className="mt-3 font-display text-3xl text-ink">Startup discovery</h1>
          </div>
          <Link
            href="/startup"
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-ink"
          >
            Launch a Startup
          </Link>
        </div>

        {loading ? (
          <div className="mt-6">
            <ExploreSkeleton />
          </div>
        ) : null}
        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {startups.length === 0 ? (
              <p className="text-sm text-ink/60">No startups yet. Be the first to share.</p>
            ) : null}
            {startups.map((startup) => (
              <div key={startup._id} className="rounded-2xl border border-ink/10 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{startup.stage}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{startup.name}</h3>
                <p className="mt-2 text-sm text-ink/70">{startup.tagline}</p>
                <div className="mt-3 text-xs text-ink/50">
                  Owner: {startup.owner?.name || "Founder"}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
