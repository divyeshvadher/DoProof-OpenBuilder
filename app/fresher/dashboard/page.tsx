"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ChallengeStatus = "Not Started" | "In Progress" | "Submitted";
type Challenge = {
  title: string;
  status: ChallengeStatus;
  role: string;
};
type Proof = {
  title: string;
  role: string;
  status: "Under Review" | "Verified" | "Needs Changes";
  submittedOn: string;
  aiScore: number;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function FresherDashboardPage() {
  const router = useRouter();
  const [profileName, setProfileName] = useState<string>("Your Name");
  const [skills, setSkills] = useState<string>("React, SQL, Figma");

  useEffect(() => {
    try {
      const savedAuth = window.localStorage.getItem("doproof.fresher.auth");
      const savedProfile = window.localStorage.getItem("doproof.fresher.profile");
      if (savedProfile) {
        const p = JSON.parse(savedProfile) as { name?: string; skills?: string };
        if (p.name) setProfileName(p.name);
        if (p.skills) setSkills(p.skills);
      } else if (savedAuth) {
        const a = JSON.parse(savedAuth) as { name?: string };
        if (a.name) setProfileName(a.name);
      }
    } catch {
      // ignore
    }
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Challenges completed", value: 2 },
      { label: "Proofs uploaded", value: 3 },
      { label: "AI feedback score", value: 82 },
    ],
    []
  );

  const progressLevel = useMemo(() => {
    const score = metrics[2].value;
    if (score >= 85) return "Proving Expert";
    if (score >= 70) return "Rising Builder";
    return "Getting Started";
  }, [metrics]);

  const challenges: Challenge[] = [
    { title: "Frontend Onboarding Revamp", status: "In Progress", role: "Engineering" },
    { title: "Referral Loop Design", status: "Not Started", role: "Product" },
    { title: "Revenue Dashboard", status: "Submitted", role: "Data" },
  ];

  const proofs: Proof[] = [
    { title: "Onboarding flow revamp", role: "Frontend", status: "Under Review", submittedOn: "2025-03-02", aiScore: 78 },
    { title: "Referral loop experiment", role: "Product", status: "Verified", submittedOn: "2025-02-18", aiScore: 88 },
    { title: "Revenue dashboard v1", role: "Data", status: "Needs Changes", submittedOn: "2025-02-10", aiScore: 65 },
  ];

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.fresher.auth");
      window.localStorage.removeItem("doproof.fresher.profile");
    } catch {
      // ignore
    }
    router.push("/fresher/auth");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/fresher/dashboard" className="group inline-flex items-center gap-2" aria-label="DoProof fresher dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">{profileName}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="/fresher/dashboard" className="text-xs font-semibold text-neutral-700 hover:text-black">Dashboard</a>
            <a href="/fresher/challenges" className="text-xs font-semibold text-neutral-700 hover:text-black">Browse Challenges</a>
            <a href="/fresher/dashboard#upload" className="text-xs font-semibold text-neutral-700 hover:text-black">Upload Proof</a>
            <a href={`/fresher/portfolio/${slugify(profileName)}`} className="text-xs font-semibold text-neutral-700 hover:text-black">Portfolio</a>
          </nav>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Main */}
        <main className="py-6">

            {/* Profile summary */}
            <section id="dashboard" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                    Profile
                  </div>
                  <h1 className="mt-3 text-xl font-extrabold tracking-tight text-black">{profileName}</h1>
                  <p className="mt-1 text-sm text-neutral-700">Skills: {skills}</p>
                  <div className="mt-4 inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    Progress level: {progressLevel}
                  </div>
                </div>

                {/* Overview metrics */}
                <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                    Overview
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
                        <div className="text-2xl font-extrabold text-black">{m.value}</div>
                        <div className="mt-1 text-xs text-neutral-700">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Your Challenges */}
            <section id="browse" className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Your challenges</h2>
                <a
                  href="/fresher/challenges"
                  className="text-xs font-semibold text-neutral-700 transition hover:text-black"
                >
                  Browse challenges
                </a>
              </div>

              {challenges.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-black/10 bg-white p-6 text-center">
                  <h3 className="text-base font-semibold text-black">No challenges yet</h3>
                  <p className="mt-2 text-sm text-neutral-700">
                    Start your first founder-style challenge to build proof and get noticed.
                  </p>
                  <a
                    href="/fresher/challenges"
                    className="mt-3 inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-neutral-900"
                  >
                    Start challenge
                  </a>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {challenges.map((c, idx) => (
                    <div key={`${c.title}-${idx}`} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-black">{c.title}</div>
                        <span className="inline-flex items-center rounded-full border border-black/10 px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-600">{c.role}</div>
                      <p className="mt-2 text-sm text-neutral-700">
                        Ship artifacts and outcomes — repos, PRs, Looms, dashboards.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-900">
                          Continue
                        </button>
                        <button className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm hover:bg-neutral-50">
                          View brief
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Your Proofs */}
            <section id="upload" className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Your proofs</h2>
                <button className="text-xs font-semibold text-neutral-700 transition hover:text-black">
                  Upload proof
                </button>
              </div>

              {proofs.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-black/10 bg-white p-6 text-center">
                  <h3 className="text-base font-semibold text-black">No proofs yet</h3>
                  <p className="mt-2 text-sm text-neutral-700">
                    Upload your work artifacts and share your outcomes to build trust.
                  </p>
                  <button className="mt-3 inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-neutral-900">
                    Upload now
                  </button>
                </div>
              ) : (
                <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                  <div className="grid grid-cols-12 border-b border-black/10 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700">
                    <div className="col-span-4">Proof</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Submitted</div>
                    <div className="col-span-2">AI score</div>
                  </div>
                  {proofs.map((p) => (
                    <div key={p.title} className="grid grid-cols-12 px-4 py-3 text-sm text-neutral-800">
                      <div className="col-span-4 font-semibold text-black">{p.title}</div>
                      <div className="col-span-2">{p.role}</div>
                      <div className="col-span-2">{p.status}</div>
                      <div className="col-span-2">{p.submittedOn}</div>
                      <div className="col-span-2">{p.aiScore}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Portfolio placeholder */}
            <section id="portfolio" className="mt-10">
              <h2 className="text-lg font-bold text-black">Portfolio</h2>
              <p className="mt-2 text-sm text-neutral-700">
                Your proof-based portfolio will appear here. Shareable, clean, and trust-first.
              </p>
            </section>

            {/* Footer note */}
            <p className="mt-10 text-xs text-neutral-600">
              This is a demo dashboard with sample data. Connect features later to manage real challenges and proofs.
            </p>
          </main>
        </div>
    </div>
  );
}
