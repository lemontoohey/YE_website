import {
  Hero,
  MasonryGallery,
  AboutSection,
  ContactSection,
  PricingSection,
  TheWatchlist,
} from "@/components/sections";
import { TheftAutoGatekeeper } from "@/components/layout";

export default function Home() {
  return (
    <TheftAutoGatekeeper>
      <Hero />
      <MasonryGallery />
      <AboutSection />
      <ContactSection />
      <PricingSection />
      <TheWatchlist />
    </TheftAutoGatekeeper>
  );
}
