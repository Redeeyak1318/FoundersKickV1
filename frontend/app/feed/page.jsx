"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch, getAuthToken } from "../../lib/api";

const FeedSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((item) => (
      <div key={item} className="rounded-2xl border border-ink/10 bg-white p-5">
        <div className="h-4 w-32 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-ink/10" />
        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-ink/10" />
      </div>
    ))}
  </div>
);

export default function Feed() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
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
    apiFetch("/api/posts")
      .then((data) => {
        if (!active) return;
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load feed.");
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
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
          <div className="h-6 w-40 animate-pulse rounded bg-ink/10" />
          <div className="mt-4 h-8 w-1/2 animate-pulse rounded bg-ink/10" />
          <div className="mt-6">
            <FeedSkeleton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Community Feed</p>
            <h1 className="mt-3 font-display text-3xl text-ink">Founder activity</h1>
          </div>
          <Link
            href="/startup"
            className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white"
          >
            Create Startup
          </Link>
        </div>

        {loading ? (
          <div className="mt-6">
            <FeedSkeleton />
          </div>
        ) : null}
        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-6 space-y-4">
            {posts.length === 0 ? (
              <p className="text-sm text-ink/60">No posts yet. Start the conversation.</p>
            ) : null}
            {posts.map((post) => (
              <div key={post._id} className="rounded-2xl border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold text-ink">
                  {post.author?.name || "Founder"}
                </p>
                <p className="mt-2 text-sm text-ink/70">{post.content}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-ink/50">
                  <span>{post.likes?.length || 0} likes</span>
                  <span>{post.comments?.length || 0} comments</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
