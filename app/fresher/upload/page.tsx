"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "Engineering" | "Product" | "Design" | "Data" | "Other";

type Proof = {
  title: string;
  role: Role;
  status: "Under Review" | "Verified" | "Needs Changes";
  submittedOn: string;
  aiScore: number;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function FresherUploadProofPage() {
  const router = useRouter();
  const [profileName, setProfileName] = useState<string>("Your Name");
  const [title, setTitle] = useState<string>("");
  const [role, setRole] = useState<Role>("Engineering");
  const [summary, setSummary] = useState<string>("");
  const [attachments, setAttachments] = useState<FileList | null>(null);

  useEffect(() => {
    try {
      const savedProfile = window.localStorage.getItem("doproof.fresher.profile");
      const savedAuth = window.localStorage.getItem("doproof.fresher.auth");
      const name =
        savedProfile ? (JSON.parse(savedProfile) as { name?: string }).name : (JSON.parse(savedAuth || "{}") as { name?: string }).name;
      if (name) setProfileName(name);
    } catch {}
  }, []);

  const profileSlug = useMemo(() => slugify(profileName), [profileName]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submittedOn = new Date().toISOString().slice(0, 10);
    const newProof: Proof = {
      title: title || "Untitled proof",
      role,
      status: "Under Review",
      submittedOn,
      aiScore: 0,
    };
    try {
      const existing = window.localStorage.getItem("doproof.fresher.proofs");
      const list = existing ? (JSON.parse(existing) as Proof[]) : [];
      const next = [newProof, ...list];
      window.localStorage.setItem("doproof.fresher.proofs", JSON.stringify(next));
      if (attachments && attachments.length > 0) {
        const names = Array.from(attachments).map((f) => f.name);
        window.localStorage.setItem("doproof.fresher.attachments", JSON.stringify(names));
      }
      if (summary) {
        window.localStorage.setItem("doproof.fresher.lastSummary", summary);
      }
    } catch {}
    router.push(`/fresher/portfolio/${profileSlug}`);
  }

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.fresher.auth");
      window.localStorage.removeItem("doproof.fresher.profile");
    } catch {}
    router.push("/fresher/auth");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/fresher/dashboard" className="group inline-flex items-center gap-2" aria-label="Back to dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Upload Proof</span>
            </span>
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="/fresher/dashboard" className="text-xs font-semibold text-neutral-700 hover:text-black">Dashboard</a>
            <a href="/fresher/challenges" className="text-xs font-semibold text-neutral-700 hover:text-black">Browse Challenges</a>
            <a href="/fresher/upload" className="text-xs font-semibold text-neutral-700 hover:text-black">Upload Proof</a>
            <a href={`/fresher/portfolio/${profileSlug}`} className="text-xs font-semibold text-neutral-700 hover:text-black">Portfolio</a>
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

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <main className="py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
              Submit your proof
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-black">Upload Proof</h1>
            <p className="mt-1 text-sm text-neutral-700">Add a title, select role, and attach artifacts. Your portfolio updates after submission.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div>
                <label className="block text-xs font-semibold text-neutral-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Onboarding flow revamp"
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  {(["Engineering", "Product", "Design", "Data", "Other"] as Role[]).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700">Summary (optional)</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  placeholder="Briefly describe artifacts, decisions, and outcomes."
                  className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700">Attachments (optional)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setAttachments(e.target.files)}
                  className="mt-2 block w-full text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-neutral-800 hover:file:bg-neutral-200"
                />
                <p className="mt-1 text-[11px] text-neutral-600">Upload screenshots, docs, or links as files.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                >
                  Submit proof
                </button>
              </div>
            </form>
          </main>
        </div>
      </section>
    </div>
  );
}

