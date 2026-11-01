import { notFound } from "next/navigation";

import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { validSections } from "@/data/portfolio";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;

  if (section && section.length > 0) {
    const [slug] = section;
    if (!validSections.has(slug)) {
      notFound();
    }
  }

  return <PortfolioPage />;
}
