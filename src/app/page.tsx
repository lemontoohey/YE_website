import {
  Hero,
  MasonryGallery,
  AboutSection,
  ContactSection,
  TheWatchlist,
} from "@/components/sections";
import { Gatekeeper } from "@/components/layout";

export default function Home() {
  return (
    <Gatekeeper>
      <Hero />
      <MasonryGallery />
      <AboutSection />
      <ContactSection />
      <TheWatchlist />
    </Gatekeeper>
  );
}
