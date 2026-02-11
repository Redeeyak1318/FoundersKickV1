"use client";

import { useRouter } from "next/navigation";


const Feature = ({ title, text }) => (
  <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
    <h3 className="font-display text-lg text-ink">{title}</h3>
    <p className="mt-2 text-sm text-ink/70">{text}</p>
  </div>
)

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.3em] text-moss">FoundersKick</p>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">
              Connect. Commit. Collaborate.
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink/70">
              Discover startups, build relationships, and turn ambitious ideas into real ventures.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/auth/login")}
                className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </button>

              <button
                onClick={() => router.push("/auth/signup")}
                className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink"
              >
                Explore Startups
              </button>
            </div>


          </div>
          <div className="flex-1">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-moss">Community Pulse</span>
                <span className="text-xs text-ink/50">Live</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-sand/60 p-4">
                  <p className="text-sm font-semibold text-ink">SolarNest</p>
                  <p className="text-xs text-ink/60">Scaling clean energy for urban homes.</p>
                </div>
                <div className="rounded-2xl bg-sand/60 p-4">
                  <p className="text-sm font-semibold text-ink">OrbitLedger</p>
                  <p className="text-xs text-ink/60">Building the next-gen founder ledger.</p>
                </div>
                <div className="rounded-2xl bg-sand/60 p-4">
                  <p className="text-sm font-semibold text-ink">HarvestLoop</p>
                  <p className="text-xs text-ink/60">Connecting agritech mentors with builders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <Feature
          title="Startup Discovery"
          text="Showcase your startup, track traction, and attract strategic collaborators."
        />
        <Feature
          title="Founder Network"
          text="Build authentic connections with founders, investors, and builders."
        />
        <Feature
          title="Opportunities"
          text="Post jobs, cofounder roles, and gigs to assemble the right team."
        />
      </section>
    </main>
  )
}
