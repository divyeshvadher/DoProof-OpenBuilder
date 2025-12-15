"use client";

import { useEffect, useState } from "react";

type Metric = { label: string; value: number };
type ProofRow = {
  fresher: string;
  challenge: string;
  submittedOn: string;
  score: number;
  status: "Pending Review" | "Reviewed" | "Shortlisted";
};
type Challenge = {
  title: string;
  role: string;
  status: "Active" | "Closed" | "Draft";
};

export default function CompanyDashboardPage() {
  const [companyName, setCompanyName] = useState<string>("Your company");

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem("doproof.company.name");
      const savedAuth = window.localStorage.getItem("doproof.company.auth");
      if (savedName) {
        setCompanyName(savedName);
      } else if (savedAuth) {
        const parsed = JSON.parse(savedAuth) as { name?: string };
        if (parsed?.name) setCompanyName(parsed.name);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Dummy data (no backend)
  const metrics: Metric[] = [
    { label: "Total challenges", value: 3 },
    { label: "Submissions received", value: 12 },
    { label: "Shortlisted candidates", value: 4 },
  ];

  const recentProofs: ProofRow[] = [
    { fresher: "Aarav S.", challenge: "Frontend Onboarding Revamp", submittedOn: "2025-03-02", score: 78, status: "Pending Review" },
    { fresher: "Isha K.", challenge: "Design a Referral Loop", submittedOn: "2025-02-18", score: 88, status: "Reviewed" },
    { fresher: "Rohan M.", challenge: "Revenue Dashboard v1", submittedOn: "2025-02-10", score: 65, status: "Pending Review" },
    { fresher: "Devika R.", challenge: "Secure Feature Flag Service", submittedOn: "2025-03-05", score: 91, status: "Shortlisted" },
    { fresher: "Nikhil T.", challenge: "Landing Page Performance", submittedOn: "2025-03-07", score: 73, status: "Reviewed" },
  ];

  const challenges: Challenge[] = [
    { title: "Frontend Onboarding Revamp", role: "Engineering", status: "Active" },
    { title: "Design a Referral Loop", role: "Product", status: "Draft" },
    { title: "Revenue Dashboard v1", role: "Data", status: "Closed" },
  ];

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.company.auth");
    } catch {
      // ignore
    }
    // Demo: soft sign-out feedback
    alert("Signed out (demo).");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="group inline-flex items-center gap-2" aria-label="DoProof company dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-neutral-600 md:inline">Signed in as {companyName}</span>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Ambient gradient */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        {/* App shell */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:gap-8">
            {/* Sidebar */}
            <aside className="sticky top-0 z-10 hidden h-[calc(100vh-2rem)] md:block">
              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-black">DoProof</div>
                    <div className="truncate text-xs text-neutral-600">{companyName}</div>
                  </div>
                </div>

                <nav className="mt-6 space-y-1">
                  {[
                    { label: "Dashboard", href: "/company/dashboard" },
                    { label: "Post Challenge", href: "/company/challenges/post" },
                    { label: "Browse Talent", href: "/company/candidates" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
                    >
                      <span>{item.label}</span>
                      <svg className="h-3.5 w-3.5 text-neutral-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l3.707 3.707a1 1 0 010 1.414l-3.707 3.707a1 1 0 01-1.414 0z" />
                      </svg>
                    </a>
                  ))}
                </nav>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="py-6">
              {/* Header for mobile */}
              <div className="md:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
                    <div>
                      <div className="text-sm font-bold text-black">DoProof</div>
                      <div className="text-xs text-neutral-600">{companyName}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Overview */}
              <section id="dashboard" className="mt-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                  Dashboard
                </div>
                <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-black">Welcome, {companyName}</h1>
                <p className="mt-1 text-sm text-neutral-700">Overview of your challenges and proof activity.</p>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
                      <div className="text-2xl font-extrabold text-black">{m.value}</div>
                      <div className="mt-1 text-xs text-neutral-700">{m.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Proofs table */}
              <section className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-black">Recent Proofs</h2>
                  <a
                    href="/company/challenges"
                    className="text-xs font-semibold text-neutral-700 transition hover:text-black"
                  >
                    View all
                  </a>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                  <div className="grid grid-cols-12 border-b border-black/10 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700">
                    <div className="col-span-3">Fresher</div>
                    <div className="col-span-4">Challenge</div>
                    <div className="col-span-2">Submitted</div>
                    <div className="col-span-1">Score</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {recentProofs.map((p) => (
                    <div key={`${p.fresher}-${p.submittedOn}`} className="grid grid-cols-12 px-4 py-3 text-sm text-neutral-800">
                      <div className="col-span-3 font-semibold text-black">{p.fresher}</div>
                      <div className="col-span-4">{p.challenge}</div>
                      <div className="col-span-2">{p.submittedOn}</div>
                      <div className="col-span-1">{p.score}</div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {recentProofs.length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-neutral-700">No recent proofs.</div>
                  )}
                </div>
              </section>

              {/* Your Challenges */}
              <section className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-black">Your Challenges</h2>
                  <a
                    href="/company/challenges/post"
                    className="text-xs font-semibold text-neutral-700 transition hover:text-black"
                  >
                    Post challenge
                  </a>
                </div>

                {challenges.length === 0 ? (
                  <div className="mt-4 rounded-2xl border border-dashed border-black/10 bg-white p-6 text-center">
                    <h3 className="text-base font-semibold text-black">No challenges yet</h3>
                    <p className="mt-2 text-sm text-neutral-700">
                      Post your first founder-style challenge to start reviewing proofs from freshers.
                    </p>
                    <a
                      href="/company/challenges/post"
                      className="mt-3 inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                    >
                      Post first challenge
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {challenges.map((c) => (
                      <div key={c.title} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-black">{c.title}</div>
                          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                            {c.status}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-neutral-600">{c.role}</div>
                        <p className="mt-2 text-sm text-neutral-700">
                          Founder-style brief to assess real skills with artifacts and outcomes.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                            onClick={() => alert("Manage challenge (demo)")}
                          >
                            Manage
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                            onClick={() => alert("View challenge (demo)")}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section id="talent" className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-black">Browse Talent</h2>
                  <a
                    href="/company/candidates"
                    className="text-xs font-semibold text-neutral-700 transition hover:text-black"
                  >
                    Browse all talent
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    { name: "Aarav S.", role: "Frontend Engineer", skills: "React, TypeScript, Tailwind", aiScore: 88, status: "Verified", updated: "2025-03-08" },
                    { name: "Isha K.", role: "Product Analyst", skills: "Figma, Strategy, SQL", aiScore: 91, status: "Shortlisted", updated: "2025-03-05" },
                    { name: "Rohan M.", role: "Data Analyst", skills: "SQL, BI, Viz", aiScore: 82, status: "Under Review", updated: "2025-03-06" },
                    { name: "Devika R.", role: "Backend Engineer", skills: "Node.js, REST, Testing", aiScore: 89, status: "Verified", updated: "2025-03-07" },
                  ].map((c) => (
                    <div key={c.name} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-black">{c.name}</div>
                        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-600">{c.role}</div>
                      <p className="mt-2 text-sm text-neutral-700">{c.skills}</p>
                      <div className="mt-2 text-xs text-neutral-600">AI score: {c.aiScore}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                          onClick={() => alert("View profile (demo)")}
                        >
                          View Profile
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                          onClick={() => alert("Shortlist (demo)")}
                        >
                          Shortlist
                        </button>
                      </div>
                      <div className="mt-2 text-[11px] text-neutral-500">Updated {c.updated}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer note */}
              <p className="mt-10 text-xs text-neutral-600">
                This is a demo dashboard with sample data. Connect features later to manage real challenges and proofs.
              </p>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
