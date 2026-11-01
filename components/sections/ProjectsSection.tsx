import { portfolio } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Selected work and case studies.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.projects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-48 items-center justify-center border-b border-slate-200 bg-slate-100 text-slate-500">
                {project.image ? (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_55%)] p-6">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-semibold uppercase tracking-[0.2em] text-slate-700">
                      {project.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {project.name}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Project preview
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {project.summary}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={`${project.name}-${tech}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {project.repoUrl &&
                  project.repoUrl !== "TODO: add repository URL" ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                      View code
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                      Live demo
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
