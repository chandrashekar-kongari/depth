import { Deployment } from "@/components/deployment";
import { Direction } from "@/components/direction";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { PilotBand } from "@/components/pilot-band";
import { ReviewQueue } from "@/components/review-queue";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ReviewQueue />
      <Deployment />
      <Direction />
      <PilotBand />
      <Faq />
    </main>
  );
}
