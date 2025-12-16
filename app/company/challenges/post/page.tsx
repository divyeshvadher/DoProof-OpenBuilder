"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type TimeBucket = "<2h" | "2–4h" | "4–8h" | "8h+";

export default function CompanyPostChallengePage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("Your company");
  const [form, setForm] = useState({
    title: "",
    role: "Engineering",
    brief: "",
    difficulty: "Intermediate" as Difficulty,
    time: "4–8h" as TimeBucket,
    reward: "",
    description: "",
    skills: "",
    deliverables: "",
    criteria: "",
    deadline: "",
    references: "",
    contactEmail: "",
  });

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

  function handleChange<T extends keyof typeof form>(key: T, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        deliverables: form.deliverables.split("\n").map((d) => d.trim()).filter(Boolean),
        criteria: form.criteria.split("\n").map((c) => c.trim()).filter(Boolean),
        references: form.references.split(",").map((r) => r.trim()).filter(Boolean),
      };
      const existing = window.localStorage.getItem("doproof.company.challenges");
      const list = existing ? JSON.parse(existing) : [];
      list.push(payload);
      window.localStorage.setItem("doproof.company.challenges", JSON.stringify(list));
      alert("Challenge posted (demo).");
      router.push("/company/dashboard");
    } catch {
      alert("Failed to save locally (demo).");
    }
  }

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
          <a href="/company/dashboard" className="group inline-flex items-center gap-2" aria-label="Back to dashboard">
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
              Post Challenge
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-black">Create a new challenge</h1>
            <p className="mt-1 text-sm text-neutral-700">Define a founder-style brief with clear outcomes and artifacts.</p>

              <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Title</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Frontend Onboarding Revamp"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Role</label>
                    <select
                      required
                      value={form.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    >
                      {["Engineering", "Product", "Design", "Data", "Ops", "Other"].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Difficulty</label>
                    <select
                      required
                      value={form.difficulty}
                      onChange={(e) => handleChange("difficulty", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    >
                      {["Beginner", "Intermediate", "Advanced"].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Estimated time</label>
                    <select
                      required
                      value={form.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    >
                      {["<2h", "2–4h", "4–8h", "8h+"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Reward</label>
                    <input
                      type="text"
                      required
                      value={form.reward}
                      onChange={(e) => handleChange("reward", e.target.value)}
                      placeholder="250 points"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Deadline</label>
                    <input
                      type="date"
                      required
                      value={form.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Brief</label>
                    <input
                      type="text"
                      required
                      value={form.brief}
                      onChange={(e) => handleChange("brief", e.target.value)}
                      placeholder="Improve onboarding flow UI/UX for higher activation."
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Description</label>
                    <textarea
                      required
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Describe the challenge, goals, scope, constraints, and any assets provided."
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                      rows={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Skills (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={form.skills}
                      onChange={(e) => handleChange("skills", e.target.value)}
                      placeholder="React, TypeScript, Tailwind"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Contact email</label>
                    <input
                      type="email"
                      required
                      value={form.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      placeholder="talent@company.com"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Deliverables (one per line)</label>
                    <textarea
                      required
                      value={form.deliverables}
                      onChange={(e) => handleChange("deliverables", e.target.value)}
                      placeholder="Responsive React implementation&#10;Screenshots and walkthrough&#10;Brief write-up"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Evaluation criteria (one per line)</label>
                    <textarea
                      required
                      value={form.criteria}
                      onChange={(e) => handleChange("criteria", e.target.value)}
                      placeholder="Clarity of UX decisions&#10;Code quality and accessibility&#10;Measured impact assumptions"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">References (comma-separated)</label>
                    <input
                      type="text"
                      value={form.references}
                      onChange={(e) => handleChange("references", e.target.value)}
                      placeholder="Design patterns, Accessibility guide"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                  >
                    Post challenge
                  </button>
                  <a
                    href="/company/challenges/post"
                    className="inline-flex items-center rounded-md border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </main>
          </div>
      </section>
    </div>
  );
}
