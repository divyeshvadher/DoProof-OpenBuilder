"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Proof = {
  title: string;
  role: "Engineering" | "Product" | "Design" | "Data" | "Other";
  status: "Under Review" | "Verified" | "Needs Changes";
  submittedOn: string;
  aiScore: number;
  repoUrl?: string;
  summary?: string;
  links?: string[];
  attachments?: string[];
  declared?: boolean;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function FresherPortfolioPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [profileName, setProfileName] = useState<string>("Your Name");
  const [skills, setSkills] = useState<string>("React, SQL, Figma");
  const [proofs, setProofs] = useState<Proof[]>([]);

  useEffect(() => {
    try {
      const savedProfile = window.localStorage.getItem("doproof.fresher.profile");
      if (savedProfile) {
        const p = JSON.parse(savedProfile) as { name?: string; skills?: string };
        if (p.name) setProfileName(p.name);
        if (p.skills) setSkills(p.skills);
      }
      const savedProofs = window.localStorage.getItem("doproof.fresher.proofs");
      if (savedProofs) {
        const list = JSON.parse(savedProofs) as Proof[];
        setProofs(list);
      } else {
        setProofs([
          { title: "Onboarding flow revamp", role: "Engineering", status: "Under Review", submittedOn: "2025-03-02", aiScore: 78 },
          { title: "Referral loop experiment", role: "Product", status: "Verified", submittedOn: "2025-02-18", aiScore: 88 },
          { title: "Revenue dashboard v1", role: "Data", status: "Needs Changes", submittedOn: "2025-02-10", aiScore: 65 },
        ]);
      }
    } catch {
      // ignore
    }
  }, []);

  const slugMatches = useMemo(() => slugify(profileName) === params.slug, [profileName, params.slug]);

  const summary = useMemo(() => {
    const total = proofs.length || 1;
    const avgScore =
      Math.round((proofs.reduce((acc, p) => acc + (p.aiScore || 0), 0) / total) * 10) / 10;
    const byRole = proofs.reduce<Record<string, number>>((acc, p) => {
      acc[p.role] = (acc[p.role] || 0) + 1;
      return acc;
    }, {});
    const byStatus = proofs.reduce<Record<string, number>>((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    return { avgScore, byRole, byStatus };
  }, [proofs]);

  const roleSegments = useMemo(() => {
    const entries = Object.entries(summary.byRole);
    const total = entries.reduce((acc, [, v]) => acc + v, 0) || 1;
    let current = 0;
    const colors: Record<string, string> = {
      Engineering: "#7c3aed", // violet-600
      Product: "#f472b6", // fuchsia-400
      Design: "#38bdf8", // sky-400
      Data: "#10b981", // emerald-500
      Other: "#f59e0b", // amber-500
    };
    return entries.map(([key, val]) => {
      const start = current / total;
      const end = (current + val) / total;
      current += val;
      return { key, start, end, color: colors[key] || "#94a3b8" };
    });
  }, [summary.byRole]);

  function signOut() {
    try {
      window.localStorage.removeItem("doproof.fresher.auth");
      window.localStorage.removeItem("doproof.fresher.profile");
    } catch {
      // ignore
    }
    router.push("/fresher/auth");
  }

  const roleConic = useMemo(() => {
    const total = roleSegments.length ? roleSegments[roleSegments.length - 1].end : 1;
    const parts = roleSegments.map((s) => {
      const startDeg = Math.round(s.start * 360);
      const endDeg = Math.round(s.end * 360);
      return `${s.color} ${startDeg}deg ${endDeg}deg`;
    });
    return parts.join(", ");
  }, [roleSegments]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "doproof.fresher.proofs") {
        try {
          const list = e.newValue ? (JSON.parse(e.newValue) as Proof[]) : [];
          setProofs(list);
        } catch { }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/fresher/dashboard" className="group inline-flex items-center gap-2" aria-label="Back to dashboard">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">DoProof</span>
              <span className="ml-2 align-middle text-xs font-semibold text-neutral-600">Portfolio</span>
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

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Profile
              </div>
              <h1 className="mt-3 text-xl font-extrabold tracking-tight text-black">
                {profileName}
                {!slugMatches && (
                  <span className="ml-2 align-middle text-xs font-semibold text-amber-600">(Demo view)</span>
                )}
              </h1>
              <p className="mt-1 text-sm text-neutral-700">Skills: {skills}</p>
              <div className="mt-4 inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                Avg AI score: {isFinite(summary.avgScore) ? summary.avgScore : 0}
              </div>
              <div className="mt-4 text-[11px] text-neutral-600">
                Public portfolio URL: <span className="font-mono">/fresher/portfolio/{slugify(profileName)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                Challenge mix
              </div>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex items-center justify-center">
                  <div
                    className="h-40 w-40 rounded-full ring-1 ring-black/10"
                    style={{
                      background: `conic-gradient(${roleConic || "#e5e7eb 0deg 360deg"})`,
                    }}
                    aria-label="Pie chart of challenge types"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(summary.byRole).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 shadow-sm">
                        <span className="font-medium text-neutral-800">{key}</span>
                        <span className="text-neutral-700">{val}</span>
                      </div>
                    ))}
                    {Object.keys(summary.byRole).length === 0 && (
                      <div className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm">
                        No submissions yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Status overview
              </div>
              <div className="mt-4 space-y-3">
                {["Verified", "Under Review", "Needs Changes"].map((s) => {
                  const count = summary.byStatus[s] || 0;
                  const total = proofs.length || 1;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={s}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-800">{s}</span>
                        <span className="text-neutral-600">{count}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                          style={{ width: `${pct}%` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                Submissions
              </div>
              {proofs.length === 0 ? (
                <div className="mt-3 text-sm text-neutral-700">No proof submissions yet.</div>
              ) : (
                <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                  <div className="grid grid-cols-12 border-b border-black/10 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1">AI score</div>
                    <div className="col-span-2">Submitted</div>
                  </div>
                  {proofs.map((p, idx) => (
                    <div key={`${p.title}-${idx}`} className="px-4 py-3">
                      <div className="grid grid-cols-12 text-sm text-neutral-800">
                        <div className="col-span-5 font-semibold text-black">{p.title}</div>
                        <div className="col-span-2">{p.role}</div>
                        <div className="col-span-2">{p.status}</div>
                        <div className="col-span-1">{p.aiScore}</div>
                        <div className="col-span-2">{p.submittedOn}</div>
                      </div>
                      <div className="mt-2 text-[12px] text-neutral-700">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">Repo</span>
                          {p.repoUrl ? (
                            <a href={p.repoUrl} className="text-neutral-800 underline underline-offset-2 hover:text-black" target="_blank" rel="noreferrer">{p.repoUrl}</a>
                          ) : (
                            <span className="text-neutral-600">No repo link</span>
                          )}
                        </div>
                        {p.summary && (
                          <div className="mt-2 flex flex-wrap items-start gap-2">
                            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">Summary</span>
                            <span className="text-[12px] text-neutral-700">{p.summary}</span>
                          </div>
                        )}
                        {p.links && p.links.length > 0 && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">Links</span>
                            {p.links.map((l, i) => (
                              <a key={`${l}-${i}`} href={l} className="text-neutral-800 underline underline-offset-2 hover:text-black" target="_blank" rel="noreferrer">{l}</a>
                            ))}
                          </div>
                        )}
                        {p.attachments && p.attachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">Files</span>
                            {p.attachments.map((a, i) => (
                              <span key={`${a}-${i}`} className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-800">{a}</span>
                            ))}
                          </div>
                        )}
                        {p.declared && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700">Declaration</span>
                            <span className="text-[11px] text-neutral-700">Confirmed by candidate</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                  }</div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
              Graphs & analysis
            </div>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-black">AI score distribution</div>
                <div className="mt-3 flex items-end gap-2">
                  {proofs.map((p, idx) => (
                    <div key={`${p.title}-${idx}`} className="flex w-8 flex-col items-center">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-fuchsia-500 to-violet-600"
                        style={{ height: `${Math.max(10, Math.min(100, p.aiScore))}%` }}
                        aria-hidden="true"
                      />
                      <div className="mt-1 text-[10px] text-neutral-600">{p.aiScore}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-black">Submissions over time</div>
                <div className="mt-3 text-xs text-neutral-700">
                  {proofs
                    .slice()
                    .sort((a, b) => a.submittedOn.localeCompare(b.submittedOn))
                    .map((p, idx) => (
                      <div key={`${p.title}-${idx}`} className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-violet-600" />
                        <span className="text-neutral-800">{p.submittedOn}</span>
                        <span className="text-neutral-600">· {p.title}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
