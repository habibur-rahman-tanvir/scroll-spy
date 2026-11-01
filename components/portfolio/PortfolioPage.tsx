import type { Metadata } from "next";

import { Footer } from "../layout/Footer";
import { Navbar } from "../layout/Navbar";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { SkillsSection } from "../sections/SkillsSection";

export const metadata: Metadata = {
  title: "Habibur Rahman Tanvir | MERN Stack Developer",
  description:
    "Professional portfolio for Habibur Rahman Tanvir, a MERN Stack Developer building modern web applications with the MERN ecosystem.",
  openGraph: {
    title: "Habibur Rahman Tanvir | MERN Stack Developer",
    description:
      "Portfolio website for a MERN Stack Developer from Bangladesh.",
    type: "website",
  },
};

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main-content" className="scroll-smooth">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
