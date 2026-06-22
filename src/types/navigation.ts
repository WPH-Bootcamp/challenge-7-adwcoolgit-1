export type SectionId =
  | "hero"
  | "client-logos"
  | "results"
  | "process"
  | "services"
  | "industries"
  | "portfolio"
  | "testimonials"
  | "faq"
  | "contact"
  | "footer";

export type SectionHref = `#${SectionId}`;

export type NavigationItemKind = "navigation" | "cta";

export interface NavigationItem {
  id: string;
  label: string;
  href: SectionHref;
  kind: NavigationItemKind;
}
