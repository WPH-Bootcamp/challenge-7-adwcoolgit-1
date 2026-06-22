import { SiteFooter, SiteHeader } from "../components/layout";
import {
  ClientLogosSection,
  ContactSection,
  FaqSection,
  HeroSection,
  IndustriesSection,
  PortfolioSection,
  ProcessSection,
  ServicesSection,
  TestimonialsSection,
  ValuesSection,
} from "../components/sections";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-ink">
      <SiteHeader />
      <main>
        <HeroSection />
        <ClientLogosSection />
        <ValuesSection />
        <ProcessSection />
        <ServicesSection />
        <IndustriesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
