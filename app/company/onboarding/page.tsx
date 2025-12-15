"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = {
  title: string;
  type: "Engineering" | "Product" | "Design" | "Data" | "Ops" | "Other";
};

export default function CompanyOnboardingPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    location: "Remote",
    experience: "Freshers",
    screening: "Proof-first",
  });
  const [roles, setRoles] = useState<Role[]>([
    { title: "Frontend Intern", type: "Engineering" },
    { title: "Product Analyst (Junior)", type: "Product" },
  ]);
  const [newRoleTitle, setNewRoleTitle] = useState<string>("");
  const [newRoleType, setNewRoleType] = useState<Role["type"]>("Engineering");

  function addRole() {
    if (!newRoleTitle.trim()) return;
    setRoles((r) => [...r, { title: newRoleTitle.trim(), type: newRoleType }]);
    setNewRoleTitle("");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="group inline-flex items-center gap-2" aria-label="DoProof home">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">
                DoProof
              </span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">for Companies</span>
            </span>
          </a>
          <div className="text-xs text-neutral-600">Step 2 of 3</div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Preferences */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Hiring preferences
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-black">Tune your signals</h1>
              <p className="mt-2 text-sm text-neutral-700">
                Choose how you hire: location, experience, and screening style.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black">Location</label>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {["Remote", "Hybrid", "On-site"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPreferences((p) => ({ ...p, location: opt }))}
                        className={`inline-flex items-center rounded-md border border-black/10 px-3 py-1 font-semibold ${
                          preferences.location === opt ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Experience</label>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {["Freshers", "0–2 years", "2–4 years"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPreferences((p) => ({ ...p, experience: opt }))}
                        className={`inline-flex items-center rounded-md border border-black/10 px-3 py-1 font-semibold ${
                          preferences.experience === opt ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Screening style</label>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {["Proof-first", "Resume + proof", "Traditional"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPreferences((p) => ({ ...p, screening: opt }))}
                        className={`inline-flex items-center rounded-md border border-black/10 px-3 py-1 font-semibold ${
                          preferences.screening === opt ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Roles you’re hiring for
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-black">Define your roles</h2>
              <p className="mt-2 text-sm text-neutral-700">
                Add roles to tailor suggested proofs and challenges.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  placeholder="e.g., Backend Intern"
                  className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <select
                  value={newRoleType}
                  onChange={(e) => setNewRoleType(e.target.value as Role["type"])}
                  className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  {["Engineering", "Product", "Design", "Data", "Ops", "Other"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addRole}
                  className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 hover:bg-neutral-900"
                >
                  Add
                </button>
              </div>

              <ul className="mt-4 space-y-2">
                {roles.map((r, idx) => (
                  <li key={`${r.title}-${idx}`} className="flex items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 text-sm shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-black/10 px-2 py-1 text-[11px] font-semibold text-neutral-700">
                        {r.type}
                      </span>
                      <span className="font-semibold text-black">{r.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRoles((list) => list.filter((_, i) => i !== idx))}
                      className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs font-semibold text-black shadow-sm hover:bg-neutral-50"
                    >
                      Remove
                    </button>
                  </li>
                ))}
                {roles.length === 0 && (
                  <li className="rounded-md border border-dashed border-black/10 bg-white px-3 py-6 text-center text-sm text-neutral-600">
                    No roles yet — add your first role above.
                  </li>
                )}
              </ul>

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/company/dashboard")}
                  className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
                >
                  Continue to dashboard
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-neutral-600">Step 2 of 3 — preferences and roles help personalize your dashboard.</p>
        </div>
      </section>
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
                <span className="text-sm font-bold text-black">DoProof</span>
              </div>
              <p className="mt-2 text-xs text-neutral-700">Proof-first hiring for faster, trusted shortlists.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-700">Quick links</div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <a href="/company/dashboard" className="text-neutral-700 hover:text-black">Dashboard</a>
                <a href="/company/challenges" className="text-neutral-700 hover:text-black">Challenges</a>
                <a href="/company/challenges/post" className="text-neutral-700 hover:text-black">Post challenge</a>
                <a href="/company/candidates" className="text-neutral-700 hover:text-black">Browse talent</a>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-700">Support</div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <a href="#" className="text-neutral-700 hover:text-black">Help</a>
                <a href="#" className="text-neutral-700 hover:text-black">Privacy</a>
                <a href="#" className="text-neutral-700 hover:text-black">Terms</a>
                <a href="mailto:support@doproof.example" className="text-neutral-700 hover:text-black">Contact</a>
              </div>
            </div>
          </div>
          <div className="mt-6 text-[11px] text-neutral-500">© 2025 DoProof. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
