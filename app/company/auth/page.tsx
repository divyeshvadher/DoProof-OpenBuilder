"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SignupForm = {
  companyName: string;
  email: string;
  phone: string;
  size: string;
  industry: string;
  website: string;
  password: string;
};

export default function CompanyAuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"signIn" | "signUp">("signIn");
  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState<SignupForm>({
    companyName: "",
    email: "",
    phone: "",
    size: "",
    industry: "",
    website: "",
    password: "",
  });

  function handleSignupChange<T extends keyof SignupForm>(key: T, value: string) {
    setSignup((prev) => ({ ...prev, [key]: value }));
  }

  function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      window.localStorage.setItem(
        "doproof.company.auth",
        JSON.stringify({ email: signin.email, name: "Company User" })
      );
    } catch {
      // ignore
    }
    router.push("/company/dashboard");
  }

  function onSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      window.localStorage.setItem(
        "doproof.company.auth",
        JSON.stringify({ email: signup.email, name: signup.companyName || "Company" })
      );
      window.localStorage.setItem("doproof.company.name", signup.companyName);
      window.localStorage.setItem("doproof.company.email", signup.email);
    } catch {
      // ignore
    }
    router.push("/company/dashboard");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
          <a
            href="/"
            className="inline-flex items-center rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
          >
            Back to site
          </a>
        </div>
      </header>

      {/* Auth */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            {/* Pitch */}
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                Proof-first hiring
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
                Sign in or create your company account.
              </h1>
              <p className="mt-3 max-w-md text-neutral-700">
                A modern dashboard to shortlist verified fresher talent with real projects, not resume guesses.
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

            {/* Auth Card */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm backdrop-blur">
                {/* Tabs */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTab("signIn")}
                    className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold ${
                      tab === "signIn"
                        ? "bg-black text-white"
                        : "border border-black/10 bg-white text-black hover:bg-neutral-50"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("signUp")}
                    className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold ${
                      tab === "signUp"
                        ? "bg-black text-white"
                        : "border border-black/10 bg-white text-black hover:bg-neutral-50"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Sign In */}
                {tab === "signIn" && (
                  <form onSubmit={onSignIn} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-black">Work email</label>
                      <input
                        type="email"
                        required
                        value={signin.email}
                        onChange={(e) => setSignin({ ...signin, email: e.target.value })}
                        placeholder="talent@acme.com"
                        className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black">Password</label>
                      <input
                        type="password"
                        required
                        value={signin.password}
                        onChange={(e) => setSignin({ ...signin, password: e.target.value })}
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-neutral-600">Use any email — demo only.</p>
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
                      >
                        Sign in
                        <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}

                {/* Sign Up */}
                {tab === "signUp" && (
                  <form onSubmit={onSignUp} className="mt-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-black">Company name</label>
                        <input
                          type="text"
                          required
                          value={signup.companyName}
                          onChange={(e) => handleSignupChange("companyName", e.target.value)}
                          placeholder="Acme Inc."
                          className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black">Work email</label>
                        <input
                          type="email"
                          required
                          value={signup.email}
                          onChange={(e) => handleSignupChange("email", e.target.value)}
                          placeholder="talent@acme.com"
                          className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black">Phone</label>
                        <input
                          type="tel"
                          value={signup.phone}
                          onChange={(e) => handleSignupChange("phone", e.target.value)}
                          placeholder="+1 555 000 1234"
                          className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black">Company size</label>
                        <select
                          required
                          value={signup.size}
                          onChange={(e) => handleSignupChange("size", e.target.value)}
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
                          value={signup.industry}
                          onChange={(e) => handleSignupChange("industry", e.target.value)}
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
                          value={signup.website}
                          onChange={(e) => handleSignupChange("website", e.target.value)}
                          placeholder="https://acme.com"
                          className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-black">Password</label>
                        <input
                          type="password"
                          required
                          value={signup.password}
                          onChange={(e) => handleSignupChange("password", e.target.value)}
                          placeholder="••••••••"
                          className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-xs text-neutral-600">By continuing, you agree to Terms and Privacy.</p>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
