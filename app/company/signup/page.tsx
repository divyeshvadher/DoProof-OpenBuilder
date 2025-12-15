"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CompanySignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    size: "",
    industry: "",
    website: "",
    password: "",
  });

  function handleChange<T extends keyof typeof form>(key: T, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Persist minimal info for the verification screen (client-only)
      window.localStorage.setItem("doproof.company.email", form.email);
      window.localStorage.setItem("doproof.company.name", form.companyName);
    } catch {
      // ignore storage errors
    }
    router.push("/company/verify");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Header */}
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
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
            >
              Home
            </a>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            {/* Left: Pitch */}
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Proof-first hiring
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
                Hire verified talent — fast.
              </h1>
              <p className="mt-3 max-w-md text-neutral-700">
                Sign up to get a trust-first dashboard for screening freshers through real-world proofs,
                not resumes. Built for modern, outcome-driven hiring teams.
              </p>

              <div className="mt-6 space-y-2 text-sm text-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-violet-600" />
                  Proof-based screening
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                  AI authenticity checks
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                  Faster shortlists
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-3">
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm backdrop-blur"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Company name</label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      placeholder="Acme Inc."
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Work email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="talent@acme.com"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 555 000 1234"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Company size</label>
                    <select
                      required
                      value={form.size}
                      onChange={(e) => handleChange("size", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    >
                      <option value="" disabled>
                        Select size
                      </option>
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Industry</label>
                    <select
                      required
                      value={form.industry}
                      onChange={(e) => handleChange("industry", e.target.value)}
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    >
                      <option value="" disabled>
                        Select industry
                      </option>
                      <option value="Tech">Tech</option>
                      <option value="Fintech">Fintech</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Website</label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://acme.com"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black">Password</label>
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-neutral-600">
                    By continuing, you agree to DoProof’s Terms and Privacy.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
                  >
                    Create account
                    <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
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
