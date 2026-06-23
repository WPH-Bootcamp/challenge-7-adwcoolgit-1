import heroImage from "../assets/images/hero/hero-tech-partner.png";
import type { ActionLink, MediaAsset } from "../types";

export const companyIdentity = {
  name: "Your Logo",
  pageTitle: "Your Tech Partner for Smarter Growth",
  pageDescription:
    "We deliver tailored IT solutions to help you scale with speed and confidence.",
  footerStatement: "LET'S DISCUSS YOUR IDEAS",
} as const;

export const heroMedia: MediaAsset = {
  src: heroImage,
  alt: "A mobile product interface surrounded by technology symbols",
  width: 1024,
  height: 1024,
  displayWidth: 747,
  displayHeight: 747,
  objectPosition: "50% 50%",
  displayByMode: {
    desktop: {
      displayWidth: 747,
      displayHeight: 747,
      objectPosition: "50% 50%",
    },
    mobile: {
      displayWidth: 391,
      displayHeight: 391,
      objectPosition: "50% 50%",
    },
  },
  loading: "eager",
};

export const companyActions = {
  primary: {
    id: "lets-talk",
    label: "Let's Talk",
    href: "#contact",
  },
  consultation: {
    id: "free-consultation",
    label: "Free Consultation",
    href: "#contact",
  },
} as const satisfies Record<string, ActionLink>;

export const sectionCopy = {
  clients: {
    title: "Trusted by Global Innovators & Leading Brands",
  },
  results: {
    title: "End-to-End IT Solutions That Drive Results",
    subtitle:
      "From strategy to execution, we deliver solutions that grow your business.",
  },
  process: {
    title: "Our Process",
    subtitle: "Clear steps. Smart execution. Results you can count on.",
  },
  services: {
    title: "Smart IT Solutions That Grow With You",
    subtitle: "Tailored tech to boost efficiency, security, and results.",
  },
  industries: {
    title: "Built for Your Industry",
    subtitle:
      "We've helped companies across industries launch smarter, faster, and more securely.",
  },
  portfolio: {
    title: "From Vision to Launch! Projects We’re Proud Of",
    subtitle:
      "Take a closer look at our recent work powering startups, enterprises, and everything in between.",
  },
  testimonials: {
    title: "What Partners Say About Working With Us",
    subtitle: "Trusted voices. Real experiences. Proven results.",
  },
  faq: {
    title: "Need Help? Start Here.",
    subtitle: "Everything you need to know — all in one place.",
    consultationTitle: "Let’s talk it through",
    consultationDescription: "book a free consultation with our team.",
  },
  contact: {
    title: "Ready to Start? Let’s Talk.",
    subtitle: "Tell us what you need, and we’ll get back to you soon.",
  },
} as const;
