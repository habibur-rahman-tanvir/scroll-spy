"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { sectionMap, sectionOrder, validSections } from "@/data/portfolio";

const SECTION_IDS = sectionOrder;
const HEADER_OFFSET = 96;

function getPathFromSection(section: string) {
  return sectionMap[section as keyof typeof sectionMap] ?? "/";
}

function getSectionFromPath(pathname: string) {
  const normalized = pathname === "/" ? "/" : pathname;
  const match = Object.entries(sectionMap).find(
    ([, route]) => route === normalized,
  );
  return match ? match[0] : "home";
}

function scrollToSection(sectionId: string, behavior: ScrollBehavior = "auto") {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior });
}

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window === "undefined") return "home";
    const pathname = window.location.pathname;
    const section = getSectionFromPath(pathname);
    return validSections.has(section) ? section : "home";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isProgrammaticScrollRef = useRef(false);

  const updateUrl = useCallback(
    (nextPath: string, type: "push" | "replace") => {
      if (typeof window === "undefined") return;

      const currentPath = window.location.pathname;
      if (nextPath === currentPath) {
        return;
      }

      if (type === "push") {
        window.history.pushState({}, "", nextPath);
      } else {
        window.history.replaceState({}, "", nextPath);
      }
    },
    [],
  );

  const handleNavigationClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = event.currentTarget;
      const href = target.getAttribute("href") ?? "";

      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      ) {
        return;
      }

      const nextSection = getSectionFromPath(href);
      if (!validSections.has(nextSection)) {
        return;
      }

      event.preventDefault();
      isProgrammaticScrollRef.current = true;
      setActiveSection(nextSection);
      updateUrl(href, "push");
      setIsMenuOpen(false);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      const sectionElement = document.getElementById(nextSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior, block: "start" });
      }

      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    },
    [updateUrl],
  );

  useEffect(() => {
    const handlePopState = () => {
      const nextSection = getSectionFromPath(window.location.pathname);
      setActiveSection(nextSection);
      scrollToSection(nextSection, "auto");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) {
          return;
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const best =
          visibleEntries.find((entry) => {
            const rect = entry.boundingClientRect;
            return (
              rect.top <= window.innerHeight * 0.45 &&
              rect.bottom >= window.innerHeight * 0.45
            );
          }) ?? visibleEntries[0];

        const sectionId = best.target.id;
        const sectionPath = getPathFromSection(sectionId);
        const currentPath = window.location.pathname;

        setActiveSection(sectionId);
        if (currentPath !== sectionPath) {
          updateUrl(sectionPath, "replace");
        }
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET + 16}px 0px -48% 0px`,
        threshold: [0.15, 0.35, 0.5, 0.8],
      },
    );

    const sectionElements = SECTION_IDS.map((section) =>
      document.getElementById(section),
    ).filter(Boolean) as HTMLElement[];
    sectionElements.forEach((element) => observer.observe(element));

    const initialPath = window.location.pathname;
    const initialSection = getSectionFromPath(initialPath);
    const nextSection = validSections.has(initialSection)
      ? initialSection
      : "home";
    scrollToSection(nextSection, "auto");

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateUrl]);

  return {
    activeSection,
    isMenuOpen,
    setIsMenuOpen,
    onNavigationClick: handleNavigationClick,
  };
}
