export type ThemeName = "light";

export type MediaLoading = "eager" | "lazy";

export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  loading: MediaLoading;
}

export interface DesignSection {
  id: string;
  label: string;
  headingId: string;
  theme: ThemeName;
  order: number;
}

export interface ActionLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  image: MediaAsset;
}

export interface ValueItem {
  id: string;
  value: string;
  label: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: MediaAsset;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  image: MediaAsset;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category?: string;
  image: MediaAsset;
  href?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatar?: MediaAsset;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceOption {
  id: string;
  label: string;
  value: string;
}
