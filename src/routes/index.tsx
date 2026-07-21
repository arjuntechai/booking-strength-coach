import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/site/Hero";
import { ScheduleGrid } from "@/components/site/ScheduleGrid";
import { CoachTrust } from "@/components/site/CoachTrust";
import { Testimonials } from "@/components/site/Testimonials";
import { Logistics } from "@/components/site/Logistics";
import { FinalCTA } from "@/components/site/FinalCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_URL } from "@/data/site";
import { getDefaultDay } from "@/data/schedule";
import { scrollToElement } from "@/lib/scroll";

const TITLE = "Alex Moreno — Strength & Conditioning Coach in Barcelona";
const DESCRIPTION =
  "Private and small-group strength and conditioning coaching in Barcelona. Studio and outdoor sessions for busy professionals. Book your slot.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Index() {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToElement("schedule");
    document.getElementById(`schedule-tab-${getDefaultDay()}`)?.focus();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#schedule"
        onClick={handleSkip}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
      >
        Skip to schedule
      </a>
      <TopBar />
      <main>
        <Hero />
        <ScheduleGrid />
        <CoachTrust />
        <Testimonials />
        <Logistics />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
