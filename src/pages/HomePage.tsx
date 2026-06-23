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
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-canvas pb-6 text-ink desktop:min-h-[8145px] desktop:pb-0">
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
