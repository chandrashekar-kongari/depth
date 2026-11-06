import { Deployment } from "@/components/deployment";
import { Direction } from "@/components/direction";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { PilotBand } from "@/components/pilot-band";
import { Storage } from "@/components/storage";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Deployment />
      <Storage />
      <Direction />
      <PilotBand />
      <Faq />
    </main>
  );
}
