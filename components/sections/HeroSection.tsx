import Link from "next/link";

import { portfolio } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-24">
        <div className="space-y-8">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Available for product work
          </p>
          <div className="space-y-5">
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {portfolio.role}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              {portfolio.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {portfolio.githubUrl &&
            portfolio.githubUrl !== "TODO: add GitHub URL" ? (
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                GitHub
              </a>
            ) : null}
            {portfolio.linkedinUrl &&
            portfolio.linkedinUrl !== "TODO: add LinkedIn URL" ? (
              <a
                href={portfolio.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                LinkedIn
              </a>
            ) : null}
            {portfolio.email && portfolio.email !== "TODO: add email" ? (
              <a
                href={`mailto:${portfolio.email}`}
                className="hover:text-slate-900"
              >
                Email
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span>portfolio.ts</span>
            </div>

            <div className="space-y-3 font-mono text-sm text-slate-200">
              <div className="text-emerald-400">const profile = {"{"}</div>
              <div className="ml-4 text-slate-300">
                name:{" "}
                <span className="text-amber-300">
                  &quot;Habibur Rahman Tanvir&quot;
                </span>
                ,
              </div>
              <div className="ml-4 text-slate-300">
                role:{" "}
                <span className="text-amber-300">
                  &quot;MERN Stack Developer&quot;
                </span>
                ,
              </div>
              <div className="ml-4 text-slate-300">
                focus:{" "}
                <span className="text-amber-300">
                  &quot;Web applications with MERN&quot;
                </span>
                ,
              </div>
              <div className="text-emerald-400">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
