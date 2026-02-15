import {
  Hero,
  MasonryGallery,
  ProtocolSection,
  AboutSection,
  ContactSection,
  TheWatchlist,
} from "@/components/sections";
import { TheftAutoGatekeeper } from "@/components/layout";
import { Marquee } from "@/components/ui";

export default function Home() {
  return (
    <TheftAutoGatekeeper>
      <Hero />
      <Marquee />
      <MasonryGallery />
      <ProtocolSection />
      <AboutSection />
      <ContactSection />
      <TheWatchlist />
    </TheftAutoGatekeeper>
  );
}
