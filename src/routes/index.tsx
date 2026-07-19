import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/site/Hero";
import { ScheduleGrid } from "@/components/site/ScheduleGrid";
import { CoachTrust } from "@/components/site/CoachTrust";
import { Testimonials } from "@/components/site/Testimonials";
import { Logistics } from "@/components/site/Logistics";
import { FinalCTA } from "@/components/site/FinalCTA";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Alex Moreno — Strength & Conditioning Coach in Barcelona";
const DESCRIPTION =
  "Private and small-group strength and conditioning coaching in Barcelona. Studio and outdoor sessions for busy professionals. Book your slot.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
