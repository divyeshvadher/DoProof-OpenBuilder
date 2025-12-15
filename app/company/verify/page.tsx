"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyVerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("your email");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("doproof.company.email");
      if (saved) setEmail(saved);
    } catch {
      // ignore
    }
  }, []);

  function resend() {
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 800);
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
          <div className="text-xs text-neutral-600">Step 1 of 3</div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
              Verify your email
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
              Check your inbox
            </h1>
            <p className="mt-3 text-neutral-700">
              We sent a verification link to{" "}
              <span className="font-semibold text-black">{email}</span>. Click the link to activate your account.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={resend}
                disabled={status === "sending" || status === "sent"}
                className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-50"
              >
                {status === "sending" ? "Resending..." : status === "sent" ? "Link sent ✓" : "Resend link"}
              </button>
              <button
                onClick={() => router.push("/company/onboarding")}
                className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
              >
                Continue
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>

            <p className="mt-4 text-xs text-neutral-600">
              Didn’t get the email? Check spam or try resending. You can continue and verify later.
            </p>
          </div>
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
