"use client";

import { useState } from "react";

export default function Home() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="group inline-flex items-center gap-2" aria-label="DoProof home">
            <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-sm ring-1 ring-black/5" />
            <span className="font-bold tracking-tight">
              <span className="bg-gradient-to-br from-black to-neutral-700 bg-clip-text text-transparent">
                DoProof
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
            >
              Pricing
            </a>
            <a
              href="#faqs"
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
            >
              FAQs
            </a>
            <a
              href="/company/auth"
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
            >
              For Companies
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#get-started"
              className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 hover:bg-neutral-900"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-28 md:pt-20">
          {/* Kicker */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            Proof over pedigree
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-black md:text-6xl">
            Break the{" "}
            <span className="bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              no experience
            </span>
            ,{" "}
            <span className="bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              no job
            </span>{" "}
            loop.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-balance text-lg text-neutral-700 md:text-xl">
            DoProof turns real projects into proof-based portfolios — with AI-verified work
            samples and founder-style challenges — so freshers get hired on skill, not guesswork.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/fresher/auth"
              className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
            >
              Start proving
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
              </svg>
            </a>
            <a
              href="/company/auth"
              className="inline-flex items-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
            >
              For companies
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-neutral-600 sm:grid-cols-3">
            <div className="rounded-lg border border-black/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-600" />
                AI-verified work samples
              </div>
            </div>
            <div className="rounded-lg border border-black/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                Founder-style challenges
              </div>
            </div>
            <div className="rounded-lg border border-black/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                Proof-based portfolios
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            How it works
          </div>
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-black md:text-4xl">
                From project to proof to job — in days, not months.
              </h2>
              <p className="mt-4 max-w-xl text-neutral-700">
                DoProof gives freshers a merit-first path. Build real projects, upload proof,
                get AI verification, and share a portfolio companies trust.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href="/fresher/auth"
                  className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 hover:bg-neutral-900"
                >
                  Start proving now
                </a>
                <a
                  href="/company/auth"
                  className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-neutral-50"
                >
                  Why companies choose DoProof
                </a>
              </div>
            </div>

            {/* Steps */}
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Build a real project",
                  d: "Pick a founder-style brief or your own idea. Ship something tangible — product, feature, or analysis.",
                  c: "01",
                },
                {
                  t: "Upload proof of work",
                  d: "Link repos, PRs, Looms, dashboards, and docs. Show decisions, impact, and artifacts.",
                  c: "02",
                },
                {
                  t: "AI verification",
                  d: "We analyze commits, artifacts, and results for authenticity, complexity, and ownership.",
                  c: "03",
                },
                {
                  t: "Share your proof portfolio",
                  d: "Get a clean, trust-first profile companies can scan fast — no resume guesswork.",
                  c: "04",
                },
              ].map((s) => (
                <li
                  key={s.c}
                  className="group rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white shadow-sm ring-1 ring-black/10">
                      {s.c}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-black">{s.t}</h3>
                      <p className="mt-1 text-sm text-neutral-700">{s.d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Candidate Proof Examples */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            Candidate proof examples
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Proof that speaks for itself.
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-700">
            Real projects. Real artifacts. Real impact. Here's how freshers
            turn work into trust.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Frontend • React",
                title: "Shipped onboarding revamp",
                bullets: [
                  "GitHub PRs linked",
                  "Loom walkthrough",
                  "Sign-up rate +14% (A/B)",
                ],
                accent: "from-violet-600 to-fuchsia-500",
              },
              {
                tag: "Product • Growth",
                title: "Designed referral loop",
                bullets: ["Figma flows", "Metric model", "Activation +9%"],
                accent: "from-sky-600 to-teal-500",
              },
              {
                tag: "Data • Analytics",
                title: "Built revenue dashboard",
                bullets: ["SQL repo", "BI snapshot", "Retention insights"],
                accent: "from-orange-600 to-rose-500",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-black/10 px-2 py-1 text-[11px] font-semibold text-neutral-700">
                    {card.tag}
                  </span>
                  <span
                    className={`inline-block h-2 w-2 rounded-full bg-gradient-to-br ${card.accent}`}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <svg
                        className="mt-[2px] h-4 w-4 text-neutral-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                    AI summary verified
                  </span>
                  <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                    Ownership confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Benefits */}
      <section id="for-companies" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            For companies
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-black md:text-4xl">
            Hire verified talent — skip resume guesswork.
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-700">
            DoProof portfolios let you scan the right signals fast: scope, decisions,
            artifacts, and impact. Merit-first, outcome-focused.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Proof-based screening",
                desc: "Review real work samples instead of bullet points. See repos, design files, and dashboards in context.",
                dot: "bg-violet-600",
              },
              {
                title: "AI authenticity checks",
                desc: "Automated verification of ownership, complexity, and results so you can trust what you see.",
                dot: "bg-fuchsia-500",
              },
              {
                title: "Faster hiring loops",
                desc: "Shortlist with confidence and move to interviews quicker — with candidates who've already proven it.",
                dot: "bg-sky-500",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${b.dot}`} />
                  <h3 className="text-base font-semibold text-black">{b.title}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
              No resumes required
            </span>
            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
              Role-ready proof
            </span>
            <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
              Outcome-first matching
            </span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            Early access pricing
          </div>

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
                Simple, transparent, merit-first.
              </h2>
              <p className="mt-3 max-w-xl text-neutral-700">
                Start free. Upgrade when you're ready to scale proof and speed up hiring.
              </p>
            </div>
            <span className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              Beta • Limited seats
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "Free",
                pitch: "For freshers getting started.",
                features: ["1 proof project", "Basic AI checks", "Shareable profile"],
                accent: "from-violet-600 to-fuchsia-500",
                cta: "Start free",
              },
              {
                name: "Pro",
                price: "$9/mo",
                pitch: "For ambitious builders.",
                features: ["3 proof projects", "Deep AI verification", "Custom proof links", "Priority review"],
                accent: "from-sky-600 to-teal-500",
                cta: "Upgrade to Pro",
              },
              {
                name: "Company",
                price: "$49/mo",
                pitch: "For hiring teams.",
                features: ["Proof hub", "Verification dashboard", "Shortlisting tools", "Team collaboration"],
                accent: "from-orange-600 to-rose-500",
                cta: "Get access",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">{tier.name}</h3>
                  <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-br ${tier.accent}`} />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-2xl font-extrabold text-black">{tier.price}</div>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{tier.pitch}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg
                        className="mt-[2px] h-4 w-4 text-neutral-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 hover:bg-neutral-900"
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-neutral-600">
            Pricing is for early access. Final pricing may change with new features.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            FAQs
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Everything you need to know.
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-700">
            Quick answers about proof portfolios, AI verification, and hiring on merit.
          </p>

          <div className="mt-8 divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
            {[
              {
                q: "What is a proof portfolio?",
                a: "A proof portfolio is a curated set of real projects, artifacts, and outcomes — think repos, PRs, Looms, dashboards, and docs — presented to show how you think and ship.",
              },
              {
                q: "How does AI verification work?",
                a: "DoProof analyzes commits, artifacts, and outcomes to assess authenticity, complexity, and ownership. It flags signals and provides summaries companies can trust.",
              },
              {
                q: "Is DoProof only for freshers?",
                a: "DoProof is designed for freshers but useful for anyone who wants to showcase outcome-driven work. The goal is merit-first proof for every role.",
              },
              {
                q: "What kinds of projects are supported?",
                a: "Software, product, growth, design, data, and ops. If you can ship artifacts and outcomes, you can prove it on DoProof.",
              },
              {
                q: "How do companies use DoProof?",
                a: "Companies review proof portfolios to shortlist candidates based on scope, decisions, and impact — skipping resume guesswork and speeding up interviews.",
              },
            ].map((item, idx) => {
              const expanded = openFaq === idx;
              return (
                <div key={item.q} className="px-4 py-3">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${idx}`}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpenFaq(expanded ? null : idx)}
                  >
                    <span className="text-sm font-semibold text-black">{item.q}</span>
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md border border-black/10 text-neutral-600 transition ${
                        expanded ? "bg-neutral-100" : "bg-white"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.168l3.71-3.0a.75.75 0 111.04 1.08l-4.23 3.42a.75.75 0 01-.98 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    className={`overflow-hidden transition-all ${expanded ? "max-h-48 pt-2" : "max-h-0"}`}
                  >
                    <p className="text-sm text-neutral-700">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer id="get-started" className="relative mt-10 border-t border-black/5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/25 via-fuchsia-400/25 to-sky-400/25 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                  Merit over noise
                </div>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-black md:text-4xl">
                  Ready to prove it?
                </h2>
                <p className="mt-2 max-w-xl text-neutral-700">
                  Build a proof portfolio that speaks louder than a resume. Fast, ambitious, Gen‑Z friendly.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/fresher/auth"
                  className="inline-flex items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
                >
                  Start proving
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.22.325.996.996 0 010 .764.997.997 0 01-.22.325l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                  </svg>
                </a>
                <a
                  href="/company/auth"
                  className="inline-flex items-center rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-50"
                >
                  For companies
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
                No credit card required
              </span>
              <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
                Ship in days, not months
              </span>
              <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-1 font-semibold text-neutral-700">
                Proof-based hiring
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between text-xs text-neutral-600">
            <span>© {new Date().getFullYear()} DoProof</span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Terms (demo link)"
                role="button"
                className="transition-colors hover:text-black"
              >
                Terms
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Privacy (demo link)"
                role="button"
                className="transition-colors hover:text-black"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
