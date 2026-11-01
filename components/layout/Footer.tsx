import Link from "next/link";

import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {portfolio.name}
            </p>
            <p className="text-sm text-slate-600">{portfolio.role}</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-3 text-sm text-slate-600"
          >
            {portfolio.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2 py-1 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {portfolio.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
      </div>
    </footer>
  );
}
