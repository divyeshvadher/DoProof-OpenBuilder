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
  repoUrl: string;
  summary?: string;
  links?: string[];
  attachments?: string[];
  declared: boolean;
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
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [linksRaw, setLinksRaw] = useState<string>("");
  const [declared, setDeclared] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [flow, setFlow] = useState<"form" | "loading" | "result">("form");
  const [aiResult, setAiResult] = useState<{ score: number; strengths: string[]; improvements: string[]; questions: string[] } | null>(null);
  const isLoading = flow === "loading";

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
    setErrorMsg("");

    const ghPattern = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;
    if (!repoUrl || !ghPattern.test(repoUrl.trim())) {
      setErrorMsg("Please provide a valid GitHub repository URL (e.g., https://github.com/user/repo).");
      return;
    }
    if (!declared) {
      setErrorMsg("You must confirm this submission is your own work.");
      return;
    }
    const summaryLines = (summary || "").split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (summaryLines.length > 5) {
      setErrorMsg("Keep the summary within 4–5 lines.");
      return;
    }

    const links = (linksRaw || "")
      .split(/[\,\r\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /^https?:\/\//i.test(s));
    const attachmentNames = attachments ? Array.from(attachments).map((f) => f.name) : [];

    const submittedOn = new Date().toISOString().slice(0, 10);
    const newProof: Proof = {
      title: title || "Untitled proof",
      role,
      status: "Under Review",
      submittedOn,
      aiScore: 0,
      repoUrl: repoUrl.trim(),
      summary: summary.trim() || undefined,
      links: links.length ? links : undefined,
      attachments: attachmentNames.length ? attachmentNames : undefined,
      declared: declared,
    };

    try {
      const existing = window.localStorage.getItem("doproof.fresher.proofs");
      const list = existing ? (JSON.parse(existing) as Proof[]) : [];
      const next = [newProof, ...list];
      window.localStorage.setItem("doproof.fresher.proofs", JSON.stringify(next));
    } catch {}

    setFlow("loading");
    setTimeout(() => {
      const base = 72;
      const variance = 18;
      const score = Math.min(99, Math.max(50, base + Math.round(Math.random() * variance)));
      const strengths: string[] = [
        `Clear ${role.toLowerCase()} focus with a working repo link`,
        links.length > 0 ? `Helpful supporting links (${links.length}) included` : "Straightforward scope; easy to evaluate",
        summaryLines.length > 0 ? "Concise summary provided" : "Opportunity to add a brief summary for context"
      ];
      const improvements: string[] = [
        "Add README with setup steps and outcomes",
        "Include measurable metrics or screenshots demonstrating impact",
        links.length === 0 ? "Link a demo, PR, or Loom to give evaluators more context" : "Highlight key decisions and trade-offs in the README"
      ];
      const questions: string[] = [
        `What specific outcome or metric did this ${role.toLowerCase()} proof achieve?`,
        "Which trade-offs did you consider and how did you decide?",
        "Can you share a representative PR or short demo link to improve your score?"
      ];
      setAiResult({ score, strengths, improvements, questions });
      setFlow("result");
    }, 1200);
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
            <p className="mt-1 text-sm text-neutral-700">Provide your GitHub repository URL (required). Optionally add a short solution summary (4–5 lines), supporting links to docs or live demos, and upload screenshots or PDFs. Confirm that this submission is your own work, then click Upload. Your portfolio updates after submission.</p>

            {flow === "form" && (
              <form onSubmit={onSubmit} aria-busy={isLoading} className="mt-6 space-y-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
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
                  <label className="block text-xs font-semibold text-neutral-700">GitHub repository URL</label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                    placeholder="https://github.com/yourname/your-repo"
                    className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                  <p className="mt-1 text-[11px] text-neutral-600">Link to the repository containing your implementation.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  >
                    {["Engineering", "Product", "Design", "Data", "Other"].map((r) => (
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
                    placeholder="Briefly describe artifacts, decisions, and outcomes. Keep to ~4–5 lines."
                    className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                  <p className="mt-1 text-[11px] text-neutral-600">Tip: succinctly explain what was built, key decisions, and outcomes.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Supporting links (optional)</label>
                  <textarea
                    value={linksRaw}
                    onChange={(e) => setLinksRaw(e.target.value)}
                    rows={3}
                    placeholder="Comma-separated or one-per-line URLs (e.g., demo, docs, Loom, Figma)"
                    className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                  <p className="mt-1 text-[11px] text-neutral-600">We\u2019ll parse valid http/https links. Non-URLs are ignored.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Attachments (optional)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={(e) => setAttachments(e.target.files)}
                    className="mt-2 block w-full text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-neutral-800 hover:file:bg-neutral-200"
                  />
                  <p className="mt-1 text-[11px] text-neutral-600">Upload screenshots or PDFs as placeholders; filenames will be saved.</p>
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={declared}
                      onChange={(e) => setDeclared(e.target.checked)}
                      className="h-4 w-4 rounded border border-black/10"
                    />
                    I confirm this submission is my own work.
                  </label>
                  {errorMsg && (
                    <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                      {errorMsg}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-disabled={isLoading ? true : undefined}
                    className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                  >
                    Upload
                  </button>
                </div>
              </form>
            )}

            {flow === "loading" && (
              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm" role="status" aria-live="polite" aria-busy="true">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-black" />
                  <span className="text-sm font-semibold text-neutral-800">AI is analysing your submission…</span>
                </div>
                <p className="mt-2 text-xs text-neutral-600">Generating initial feedback. This will take a moment.</p>
              </div>
            )}

            {flow === "result" && aiResult && (
              <div className="mt-6 space-y-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-800">AI Review</h2>
                    <p className="text-xs text-neutral-600">Early feedback based on your submission.</p>
                  </div>
                  <div className="inline-flex items-center rounded-md bg-black px-3 py-1 text-xs font-semibold text-white">
                    Score: {aiResult.score}/100
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-800">Strengths</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-neutral-700">
                      {aiResult.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-800">Improvements</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-neutral-700">
                      {aiResult.improvements.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-800">Questions</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-neutral-700">
                      {aiResult.questions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[11px] text-neutral-600">Answering these is optional; it can help improve your AI score.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.push(`/fresher/portfolio/${profileSlug}`)}
                    className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-neutral-900"
                  >
                    Finish & View Portfolio
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}

