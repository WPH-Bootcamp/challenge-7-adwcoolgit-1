export type ThemeName = "light";

export type MediaLoading = "eager" | "lazy";
export type VisualMode = "desktop" | "mobile";
export type FontFamilyName = "Quicksand" | "Outfit" | "Poppins";
export type FontWeight = 500 | 600 | 700;

export interface VisualReference {
  fileKey: string;
  pageNodeId: string;
  frameNodeId: string;
  viewportWidth: number;
  frameHeight: number;
  theme: ThemeName;
  exportPath: string;
  sha256: string;
}

export interface SpacingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LayoutMetric {
  id: string;
  scope: "global" | string;
  mode: VisualMode;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  gap?: number;
  padding?: SpacingBox;
}

export interface TypographyRole {
  id: string;
  fontFamily: FontFamilyName;
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight;
  letterSpacing: number;
  mode: VisualMode;
}

export interface DisplayMedia {
  displayWidth?: number;
  displayHeight?: number;
  objectPosition?: string;
}

export interface MediaAsset {
  src: string;
  figmaAssetId?: string;
  alt: string;
  width: number;
  height: number;
  displayWidth?: number;
  displayHeight?: number;
  objectPosition?: string;
  displayByMode?: Partial<Record<VisualMode, DisplayMedia>>;
  loading: MediaLoading;
}

export interface DesignSection {
  id: string;
  label: string;
  headingId: string;
  theme: ThemeName;
  order: number;
  desktopMetrics: LayoutMetric[];
  mobileMetrics: LayoutMetric[];
  headingRole: TypographyRole["id"];
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
