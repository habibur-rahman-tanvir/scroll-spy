import { portfolio } from "@/data/portfolio";

export function ContactSection() {
  const hasEmail = Boolean(
    portfolio.email && portfolio.email !== "TODO: add email",
  );
  const hasGithub = Boolean(
    portfolio.githubUrl && portfolio.githubUrl !== "TODO: add GitHub URL",
  );
  const hasLinkedin = Boolean(
    portfolio.linkedinUrl && portfolio.linkedinUrl !== "TODO: add LinkedIn URL",
  );

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something thoughtful.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            I&apos;m open to web application projects, product collaboration,
            and development partnerships that value clean engineering and a
            strong user experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasEmail ? (
              <a
                href={`mailto:${portfolio.email}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Email me
              </a>
            ) : null}
            {hasGithub ? (
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                GitHub
              </a>
            ) : null}
            {hasLinkedin ? (
              <a
                href={portfolio.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                LinkedIn
              </a>
            ) : null}
          </div>

          {!hasEmail && !hasGithub && !hasLinkedin ? (
            <p className="mt-6 text-sm text-slate-300">
              Contact details are not configured yet. Add verified email and
              social URLs in the portfolio data file.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
