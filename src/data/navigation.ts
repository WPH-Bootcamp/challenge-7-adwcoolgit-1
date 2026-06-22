import type { NavigationItem, SectionId } from "../types";

export const sectionIds = {
  hero: "hero",
  clients: "client-logos",
  results: "results",
  process: "process",
  services: "services",
  industries: "industries",
  portfolio: "portfolio",
  testimonials: "testimonials",
  faq: "faq",
  contact: "contact",
  footer: "footer",
} as const satisfies Record<string, SectionId>;

export const primaryNavigation = [
  { id: "about", label: "About", href: "#results", kind: "navigation" },
  {
    id: "service",
    label: "Service",
    href: "#services",
    kind: "navigation",
  },
  {
    id: "projects",
    label: "Projects",
    href: "#portfolio",
    kind: "navigation",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    href: "#testimonials",
    kind: "navigation",
  },
  { id: "faq", label: "FAQ", href: "#faq", kind: "navigation" },
] as const satisfies readonly NavigationItem[];

export const headerCallToAction = {
  id: "header-contact",
  label: "Let's Talk",
  href: "#contact",
  kind: "cta",
} as const satisfies NavigationItem;
