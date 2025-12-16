"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type TimeBucket = "<2h" | "2–4h" | "4–8h" | "8h+";

type ChallengeItem = {
  id: string;
  title: string;
  company: string;
  brief: string;
  difficulty: Difficulty;
  time: TimeBucket;
  reward: string;
  description: string;
  skills: string[];
  deliverables: string[];
  criteria: string[];
  deadline: string;
  references: string[];
};

const DUMMY_CHALLENGES: ChallengeItem[] = [
  {
    id: "ch-frontend-onboarding",
    title: "Frontend Onboarding Revamp",
    company: "Acme Studios",
    brief: "Improve onboarding flow UI/UX for higher activation.",
    difficulty: "Intermediate",
    time: "4–8h",
    reward: "250 points",
    description:
      "Redesign a 3-step onboarding flow for a consumer web app. Focus on clarity, progressive disclosure, and reducing friction. Use accessible components and ship a responsive layout.",
    skills: ["React", "TypeScript", "Tailwind", "Accessibility"],
    deliverables: [
      "Responsive React implementation",
      "Screenshots and Loom walkthrough",
      "Brief write-up: decisions + tradeoffs",
    ],
    criteria: [
      "Clarity of UX decisions",
      "Code quality and accessibility",
      "Measured impact assumptions",
    ],
    deadline: "2025-03-31",
    references: ["Product onboarding patterns", "Accessible forms guide", "Motion micro-interactions"],
  },
  {
    id: "ch-product-referral",
    title: "Design a Referral Loop",
    company: "Nova Growth",
    brief: "Model and design a referral loop to increase activation.",
    difficulty: "Beginner",
    time: "2–4h",
    reward: "150 points",
    description:
      "Create a simple referral loop for a mobile app. Map triggers, rewards, and share flows. Provide a metric model for activation, invite rate, and K-factor assumptions.",
    skills: ["Figma", "Product Strategy", "Experimentation"],
    deliverables: [
      "Figma flows and components",
      "Metric model spreadsheet",
      "Hypothesis doc with risks",
    ],
    criteria: [
      "Clarity of problem framing",
      "Sound metric model",
      "Practical, minimal design",
    ],
    deadline: "2025-04-10",
    references: ["Referral design examples", "Growth loops primer", "Simple K-factor calculator"],
  },
  {
    id: "ch-data-revenue",
    title: "Revenue Dashboard v1",
    company: "DataWorks",
    brief: "Build a BI dashboard with core revenue metrics.",
    difficulty: "Advanced",
    time: "8h+",
    reward: "400 points",
    description:
      "Using a provided dummy dataset, design SQL queries and a dashboard showing MRR, churn, expansion, and cohort retention. Justify chart choices and surface actionable insights.",
    skills: ["SQL", "BI", "Data Visualization"],
    deliverables: [
      "SQL repo with queries",
      "Dashboard screenshots",
      "Insights doc with recommendations",
    ],
    criteria: [
      "Query correctness and performance",
      "Useful visualization choices",
      "Quality of insights",
    ],
    deadline: "2025-04-20",
    references: ["Revenue metrics guide", "Cohort analysis 101", "Dashboard UX best practices"],
  },
  {
    id: "ch-backend-api",
    title: "Secure Feature Flag Service",
    company: "FlagShip",
    brief: "Implement a minimal feature flag service with RBAC.",
    difficulty: "Intermediate",
    time: "4–8h",
    reward: "300 points",
    description:
      "Design and implement a small service that manages feature flags per environment with roles and basic audit logs. Include tests and a short architecture note.",
    skills: ["Node.js", "TypeScript", "REST", "Testing"],
    deliverables: [
      "Service repo with docs",
      "Endpoint tests and examples",
      "Architecture overview",
    ],
    criteria: [
      "Security and correctness",
      "Code structure and tests",
      "Simplicity and clarity",
    ],
    deadline: "2025-04-05",
    references: ["RBAC basics", "Feature flag patterns", "Testing pyramid"],
  },
];

export default function FresherBrowseChallengesPage() {
  const router = useRouter();

  const [filters, setFilters] = useState<{
    skill: string;
    difficulty: Difficulty | "";
    time: TimeBucket | "";
    company: string;
  }>({
    skill: "",
    difficulty: "",
    time: "",
    company: "",
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const skillOptions = useMemo(() => {
    const set = new Set<string>();
    DUMMY_CHALLENGES.forEach((c) => c.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);

  const companyOptions = useMemo(() => {
    const set = new Set<string>();
    DUMMY_CHALLENGES.forEach((c) => set.add(c.company));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return DUMMY_CHALLENGES.filter((c) => {
      const bySkill = filters.skill ? c.skills.includes(filters.skill) : true;
      const byDiff = filters.difficulty ? c.difficulty === filters.difficulty : true;
      const byTime = filters.time ? c.time === filters.time : true;
      const byCompany = filters.company ? c.company === filters.company : true;
      return bySkill && byDiff && byTime && byCompany;
    });
  }, [filters]);

  function clearFilters() {
    setFilters({ skill: "", difficulty: "", time: "", company: "" });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/fresher/dashboard" className="group inline-flex items-center gap-2" aria-label="Back to dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Browse Challenges</span>
            </span>
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="/fresher/dashboard" className="text-xs font-semibold text-neutral-700 hover:text-black">Dashboard</a>
            <a href="/fresher/challenges" className="text-xs font-semibold text-neutral-700 hover:text-black">Browse Challenges</a>
            <a href="/fresher/dashboard#upload" className="text-xs font-semibold text-neutral-700 hover:text-black">Upload Proof</a>
            <a href="/fresher/dashboard#portfolio" className="text-xs font-semibold text-neutral-700 hover:text-black">Portfolio</a>
          </nav>
        </div>
      </header>

      {/* Ambient gradient */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          {/* Filters */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Filters
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-neutral-700 transition hover:text-black"
              >
                Clear all
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Skill */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700">Skill</label>
                <select
                  value={filters.skill}
                  onChange={(e) => setFilters((f) => ({ ...f, skill: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">All skills</option>
                  {skillOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, difficulty: (e.target.value as Difficulty) || "" }))
                  }
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">All levels</option>
                  {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700">Estimated time</label>
                <select
                  value={filters.time}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, time: (e.target.value as TimeBucket) || "" }))
                  }
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Any</option>
                  {(["<2h", "2–4h", "4–8h", "8h+"] as TimeBucket[]).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700">Company</label>
                <select
                  value={filters.company}
                  onChange={(e) => setFilters((f) => ({ ...f, company: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">All companies</option>
                  {companyOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Challenges grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const expanded = expandedId === c.id;
              return (
                <div
                  key={c.id}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  {/* Top meta */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-black">{c.title}</h3>
                      <div className="mt-0.5 text-xs text-neutral-600">{c.company}</div>
                    </div>
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                  </div>

                  <p className="mt-3 text-sm text-neutral-700">{c.brief}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
                      {c.difficulty}
                    </span>
                    <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
                      {c.time}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
                      {c.reward}
                    </span>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : c.id)}
                      className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/10 transition-transform ${
                        expanded
                          ? "bg-black text-white hover:-translate-y-0.5"
                          : "border border-black/10 bg-white text-black hover:bg-neutral-50"
                      }`}
                    >
                      {expanded ? "Hide details" : "Learn more"}
                      <svg
                        className={`ml-2 h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.168l3.71-3.0a.75.75 0 111.04 1.08l-4.23 3.42a.75.75 0 01-.98 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                      </svg>
                    </button>
                  </div>

                  {/* Expanded details */}
                  {expanded && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-black">Description</h4>
                        <p className="mt-1 text-sm text-neutral-700">{c.description}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold text-black">Skill requirements</h4>
                          <ul className="mt-1 space-y-1 text-sm text-neutral-700">
                            {c.skills.map((s) => (
                              <li key={s} className="flex items-start gap-2">
                                <svg className="mt-[2px] h-4 w-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" />
                                </svg>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-black">Expected deliverables</h4>
                          <ul className="mt-1 space-y-1 text-sm text-neutral-700">
                            {c.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2">
                                <svg className="mt-[2px] h-4 w-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" />
                                </svg>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold text-black">Evaluation criteria</h4>
                          <ul className="mt-1 space-y-1 text-sm text-neutral-700">
                            {c.criteria.map((cr) => (
                              <li key={cr} className="flex items-start gap-2">
                                <svg className="mt-[2px] h-4 w-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" />
                                </svg>
                                <span>{cr}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-black">Deadline</h4>
                          <p className="mt-1 text-sm text-neutral-700">{c.deadline}</p>

                          <h4 className="mt-4 text-sm font-semibold text-black">Sample references</h4>
                          <ul className="mt-1 space-y-1 text-sm text-neutral-700">
                            {c.references.map((ref) => (
                              <li key={ref}>
                                <a href="#" className="text-neutral-700 underline underline-offset-2 hover:text-black">
                                  {ref}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => router.push("/fresher/dashboard#browse")}
                          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 hover:bg-neutral-900"
                        >
                          Start challenge
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-black/10 bg-white p-8 text-center">
              <h3 className="text-base font-semibold text-black">No challenges match your filters</h3>
              <p className="mt-2 text-sm text-neutral-700">Try adjusting filters or browsing all challenges.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-neutral-900"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
