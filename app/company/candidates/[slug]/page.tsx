"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Candidate = {
  slug: string;
  name: string;
  role: string;
  skills: string;
  aiScore: number;
  status: "Verified" | "Under Review" | "Shortlisted";
  proofs: Array<{ title: string; submittedOn: string; summary: string }>;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function CompanyCandidateProfilePage() {
  const params = useParams<{ slug: string }>();
  const [companyName, setCompanyName] = useState<string>("Your company");
  const router = useRouter();

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

  const candidates: Candidate[] = useMemo(
    () => [
      {
        slug: slugify("Aarav S."),
        name: "Aarav S.",
        role: "Frontend Engineer",
        skills: "React, TypeScript, Tailwind",
        aiScore: 88,
        status: "Verified",
        proofs: [
          { title: "Frontend Onboarding Revamp", submittedOn: "2025-03-02", summary: "Responsive, accessible onboarding flow." },
          { title: "Landing Page Performance", submittedOn: "2025-03-07", summary: "Optimized assets and scripts; +28% perf." },
        ],
      },
      {
        slug: slugify("Isha K."),
        name: "Isha K.",
        role: "Product Analyst",
        skills: "Figma, Strategy, SQL",
        aiScore: 91,
        status: "Shortlisted",
        proofs: [
          { title: "Design a Referral Loop", submittedOn: "2025-02-18", summary: "Triggers, rewards, share flows and metrics." },
        ],
      },
      {
        slug: slugify("Rohan M."),
        name: "Rohan M.",
        role: "Data Analyst",
        skills: "SQL, BI, Viz",
        aiScore: 82,
        status: "Under Review",
        proofs: [
          { title: "Revenue Dashboard v1", submittedOn: "2025-02-10", summary: "Core revenue metrics and cohort queries." },
        ],
      },
      {
        slug: slugify("Devika R."),
        name: "Devika R.",
        role: "Backend Engineer",
        skills: "Node.js, REST, Testing",
        aiScore: 89,
        status: "Verified",
        proofs: [
          { title: "Secure Feature Flag Service", submittedOn: "2025-03-05", summary: "RBAC, audit logs, endpoints and tests." },
        ],
      },
      {
        slug: slugify("Nikhil T."),
        name: "Nikhil T.",
        role: "Growth Designer",
        skills: "Design, Motion, Analytics",
        aiScore: 76,
        status: "Under Review",
        proofs: [
          { title: "Landing Page Performance", submittedOn: "2025-03-07", summary: "Images, lazy loading, script budget." },
        ],
      },
    ],
    []
  );

  const candidate = candidates.find((c) => c.slug === params.slug);

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.company.auth");
    } catch {}
    router.push("/company/auth");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/company/candidates" className="group inline-flex items-center gap-2" aria-label="Back to candidates">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Admin</span>
            </span>
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="/company/dashboard" className="text-xs font-semibold text-neutral-700 hover:text-black">Dashboard</a>
            <a href="/company/challenges" className="text-xs font-semibold text-neutral-700 hover:text-black">Challenges</a>
            <a href="/company/challenges/post" className="text-xs font-semibold text-neutral-700 hover:text-black">Post Challenge</a>
            <a href="/company/candidates" className="text-xs font-semibold text-neutral-700 hover:text-black">Browse Talent</a>
          </nav>
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
          <main className="py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
              Candidate Profile
            </div>
              {!candidate ? (
                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-black">Candidate not found</h2>
                  <p className="mt-2 text-sm text-neutral-700">The requested profile does not exist in the demo dataset.</p>
                  <a
                    href="/company/candidates"
                    className="mt-3 inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                  >
                    Back to candidates
                  </a>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-extrabold tracking-tight text-black">{candidate.name}</h1>
                    <div className="mt-1 text-xs text-neutral-600">{candidate.role}</div>
                    <p className="mt-2 text-sm text-neutral-700">Skills: {candidate.skills}</p>
                    <div className="mt-3 inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                      AI score: {candidate.aiScore} · Status: {candidate.status}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                      <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                      Submitted proofs
                    </div>
                    {candidate.proofs.length === 0 ? (
                      <div className="mt-3 text-sm text-neutral-700">No proof submissions.</div>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {candidate.proofs.map((p, idx) => (
                          <div key={`${p.title}-${idx}`} className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-black">{p.title}</div>
                              <div className="text-xs text-neutral-600">{p.submittedOn}</div>
                            </div>
                            <p className="mt-2 text-sm text-neutral-700">{p.summary}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                                onClick={() => alert("Open proof details (demo)")}
                              >
                                View details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
      </section>
    </div>
  );
}
