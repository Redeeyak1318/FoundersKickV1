"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch, getAuthToken } from "../../lib/api";

const stages = ["Idea", "MVP", "Growing", "Funded", "Scaling"];

export default function CreateStartup() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [stage, setStage] = useState("Idea");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    setReady(true);
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !stage) {
      setError("Please provide a name and stage.");
      return;
    }

    const optimistic = {
      name,
      tagline,
      about,
      stage
    };
    setPending(optimistic);

    try {
      setLoading(true);
      await apiFetch("/api/startups", {
        method: "POST",
        body: JSON.stringify(optimistic)
      });
      router.push("/explore");
    } catch (err) {
      setError(err.message || "Failed to create startup.");
      setPending(null);
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
          <div className="h-6 w-24 animate-pulse rounded bg-ink/10" />
          <div className="mt-4 h-8 w-1/2 animate-pulse rounded bg-ink/10" />
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-12 rounded-xl bg-ink/5 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Launch</p>
            <h1 className="mt-3 font-display text-3xl text-ink">Create a startup</h1>
          </div>
          <Link
            href="/explore"
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-ink"
          >
            Back to Explore
          </Link>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="name">
              Startup name
            </label>
            <input
              id="name"
              type="text"
              placeholder="SolarNest"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="tagline">
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              placeholder="Scaling clean energy for urban homes"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="stage">
              Stage
            </label>
            <select
              id="stage"
              className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              {stages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="about">
              About
            </label>
            <textarea
              id="about"
              placeholder="Tell the community about the problem you are solving."
              className="mt-2 min-h-[140px] w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none ring-ember/30 focus:ring-2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
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
            {loading ? "Launching..." : "Launch Startup"}
          </button>
        </form>

        {pending ? (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-sm text-emerald-800">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Pending</p>
            <h3 className="mt-2 text-lg font-semibold text-emerald-900">{pending.name}</h3>
            <p className="mt-2 text-sm text-emerald-800">{pending.tagline || ""}</p>
            <p className="mt-2 text-xs text-emerald-700">Stage: {pending.stage}</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
