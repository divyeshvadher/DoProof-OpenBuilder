"use client";

import { useEffect, useState } from "react";

type Candidate = {
  name: string;
  role: string;
  skills: string;
  aiScore: number;
  status: "Verified" | "Under Review" | "Shortlisted";
  proofs: number;
  lastUpdated: string;
};

export default function CompanyCandidatesPage() {
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
    } catch {}
  }, []);

  const candidates: Candidate[] = [
    { name: "Aarav S.", role: "Frontend Engineer", skills: "React, TypeScript, Tailwind", aiScore: 88, status: "Verified", proofs: 3, lastUpdated: "2025-03-08" },
    { name: "Isha K.", role: "Product Analyst", skills: "Figma, Strategy, SQL", aiScore: 91, status: "Shortlisted", proofs: 4, lastUpdated: "2025-03-05" },
    { name: "Rohan M.", role: "Data Analyst", skills: "SQL, BI, Viz", aiScore: 82, status: "Under Review", proofs: 2, lastUpdated: "2025-03-06" },
    { name: "Devika R.", role: "Backend Engineer", skills: "Node.js, REST, Testing", aiScore: 89, status: "Verified", proofs: 3, lastUpdated: "2025-03-07" },
    { name: "Nikhil T.", role: "Growth Designer", skills: "Design, Motion, Analytics", aiScore: 76, status: "Under Review", proofs: 2, lastUpdated: "2025-03-04" },
  ];

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.company.auth");
    } catch {}
    alert("Signed out (demo).");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/company/dashboard" className="group inline-flex items-center gap-2" aria-label="Back to dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Admin</span>
            </span>
          </a>
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

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:gap-8">
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
                    { label: "Settings", href: "/company/dashboard#settings" },
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

            <main className="py-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Browse Talent
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-black">Candidates</h1>
              <p className="mt-1 text-sm text-neutral-700">Browse verified fresher profiles based on proof and outcomes.</p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {candidates.map((c) => (
                  <div key={c.name} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-black">{c.name}</div>
                      <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                        {c.status}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-neutral-600">{c.role}</div>
                    <p className="mt-2 text-sm text-neutral-700">{c.skills}</p>
                    <div className="mt-2 text-xs text-neutral-600">AI score: {c.aiScore} · Proofs: {c.proofs}</div>
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
                    <div className="mt-2 text-[11px] text-neutral-500">Updated {c.lastUpdated}</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

