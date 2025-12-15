"use client";

import { useEffect, useMemo, useState } from "react";

type ChallengeStatus = "Active" | "Closed" | "Draft";
type Challenge = {
  title: string;
  role: string;
  status: ChallengeStatus;
  brief?: string;
  reward?: string;
  deadline?: string;
  difficulty?: string;
  time?: string;
};

type ProofRow = {
  fresher: string;
  challenge: string;
  submittedOn: string;
  score: number;
  status: "Pending Review" | "Reviewed" | "Shortlisted";
  solution: string;
  attachments: string[];
};

export default function CompanyChallengesPage() {
  const [companyName, setCompanyName] = useState<string>("Your company");
  const [posted, setPosted] = useState<Challenge[]>([]);

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
      const savedPosted = window.localStorage.getItem("doproof.company.challenges");
      if (savedPosted) {
        const list = JSON.parse(savedPosted) as Array<any>;
        const mapped: Challenge[] = list.map((c) => ({
          title: c.title || "Untitled",
          role: c.role || "Other",
          status: "Draft",
          brief: c.brief,
          reward: c.reward,
          deadline: c.deadline,
          difficulty: c.difficulty,
          time: c.time,
        }));
        setPosted(mapped);
      }
    } catch {}
  }, []);

  const defaultChallenges: Challenge[] = [
    { title: "Frontend Onboarding Revamp", role: "Engineering", status: "Active", brief: "Improve onboarding flow UI/UX.", reward: "250 points", deadline: "2025-03-31", difficulty: "Intermediate", time: "4–8h" },
    { title: "Design a Referral Loop", role: "Product", status: "Draft", brief: "Model and design a referral loop.", reward: "150 points", deadline: "2025-04-10", difficulty: "Beginner", time: "2–4h" },
    { title: "Revenue Dashboard v1", role: "Data", status: "Closed", brief: "Build a BI dashboard.", reward: "400 points", deadline: "2025-04-20", difficulty: "Advanced", time: "8h+" },
  ];

  const challenges: Challenge[] = useMemo(() => {
    return [...posted, ...defaultChallenges];
  }, [posted]);

  const recentProofs: ProofRow[] = [
    {
      fresher: "Aarav S.",
      challenge: "Frontend Onboarding Revamp",
      submittedOn: "2025-03-02",
      score: 78,
      status: "Pending Review",
      solution: "Implemented a responsive, accessible 3-step onboarding with progressive disclosure and form validations.",
      attachments: [
        "https://github.com/example/aarav-onboarding",
        "https://www.loom.com/share/example-onboarding-walkthrough"
      ],
    },
    {
      fresher: "Isha K.",
      challenge: "Design a Referral Loop",
      submittedOn: "2025-02-18",
      score: 88,
      status: "Reviewed",
      solution: "Designed referral triggers, reward logic, share flows, and a simple metric model for K-factor.",
      attachments: [
        "https://figma.com/file/example-referral-loop",
        "https://docs.google.com/spreadsheets/d/example-metrics"
      ],
    },
    {
      fresher: "Rohan M.",
      challenge: "Revenue Dashboard v1",
      submittedOn: "2025-02-10",
      score: 65,
      status: "Pending Review",
      solution: "Built SQL queries for MRR, churn, and cohorts with a basic BI dashboard and commentary.",
      attachments: [
        "https://github.com/example/rohan-revenue-sql",
        "https://example.com/bi-dashboard-screenshots"
      ],
    },
    {
      fresher: "Devika R.",
      challenge: "Secure Feature Flag Service",
      submittedOn: "2025-03-05",
      score: 91,
      status: "Shortlisted",
      solution: "Service with RBAC roles and audit trails, REST endpoints and unit tests; deployment notes included.",
      attachments: [
        "https://github.com/example/devika-feature-flags",
        "https://example.com/architecture-overview"
      ],
    },
    {
      fresher: "Nikhil T.",
      challenge: "Landing Page Performance",
      submittedOn: "2025-03-07",
      score: 73,
      status: "Reviewed",
      solution: "Optimized images, reduced script payload, implemented lazy loading; perf metrics improved by ~28%.",
      attachments: [
        "https://github.com/example/nikhil-landing-perf",
        "https://example.com/perf-report"
      ],
    },
  ];

  const [modalProof, setModalProof] = useState<ProofRow | null>(null);

  function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

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
                Challenges
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-black">Manage challenges</h1>
              <p className="mt-1 text-sm text-neutral-700">View founder-style challenges and submitted proofs.</p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {challenges.map((c) => {
                  const proofs = recentProofs.filter((p) => p.challenge === c.title);
                  return (
                    <div key={c.title} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-black">{c.title}</div>
                        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-600">{c.role}</div>
                      <p className="mt-2 text-sm text-neutral-700">{c.brief || "Founder-style brief to assess outcomes."}</p>
                      <div className="mt-2 text-xs text-neutral-600">
                        {c.reward ? `Reward: ${c.reward}` : ""} {c.deadline ? `· Deadline: ${c.deadline}` : ""}
                      </div>
                      <div className="mt-2 text-xs text-neutral-600">
                        {(c.difficulty && `Difficulty: ${c.difficulty}`) || ""} {(c.time && `· Time: ${c.time}`) || ""}
                      </div>

                      <div className="mt-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                          Submitted proofs
                        </div>
                        {proofs.length === 0 ? (
                          <div className="mt-2 text-sm text-neutral-700">No submissions yet.</div>
                        ) : (
                          <div className="mt-2 overflow-hidden rounded-xl border border-black/10 bg-white">
                            <div className="grid grid-cols-12 border-b border-black/10 bg-neutral-50 px-3 py-2 text-[11px] font-semibold text-neutral-700">
                              <div className="col-span-4">Fresher</div>
                              <div className="col-span-3">Submitted</div>
                              <div className="col-span-1">Score</div>
                              <div className="col-span-2">Solution</div>
                              <div className="col-span-2">Status</div>
                            </div>
                            {proofs.map((p) => (
                              <div key={`${p.fresher}-${p.submittedOn}`} className="grid grid-cols-12 px-3 py-2 text-sm text-neutral-800">
                                <div className="col-span-4 font-semibold text-black">
                                  <a
                                    href={`/company/candidates/${slugify(p.fresher)}`}
                                    className="transition hover:text-violet-700"
                                  >
                                    {p.fresher}
                                  </a>
                                </div>
                                <div className="col-span-3">{p.submittedOn}</div>
                                <div className="col-span-1">{p.score}</div>
                                <div className="col-span-2">
                                  <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                                    onClick={() => setModalProof(p)}
                                  >
                                    View
                                  </button>
                                </div>
                                <div className="col-span-2">
                                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">
                                    {p.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {modalProof && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                  <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2 py-1 text-[11px] font-semibold text-neutral-700">
                          <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                          Solution details
                        </div>
                        <h3 className="mt-2 text-lg font-bold text-black">
                          {modalProof.fresher} — {modalProof.challenge}
                        </h3>
                        <div className="mt-1 text-xs text-neutral-600">
                          Submitted {modalProof.submittedOn} · Score {modalProof.score} · Status {modalProof.status}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                        onClick={() => setModalProof(null)}
                      >
                        Close
                      </button>
                    </div>

                    <p className="mt-4 text-sm text-neutral-800">{modalProof.solution}</p>

                    <div className="mt-4">
                      <div className="text-xs font-semibold text-neutral-700">Attachments</div>
                      <ul className="mt-2 space-y-2 text-sm">
                        {modalProof.attachments.map((url, idx) => (
                          <li key={`${url}-${idx}`}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-700 hover:underline"
                            >
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
