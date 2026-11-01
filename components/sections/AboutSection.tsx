import { portfolio } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Building product-minded web experiences.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
            <p>{portfolio.about}</p>
            <p>
              I care about clean interfaces, dependable APIs, and clear data
              flow across the stack. My focus is on creating web applications
              that are practical, maintainable, and enjoyable for the people who
              use them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
