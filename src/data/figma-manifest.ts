/**
 * Authoritative extraction from Figma file kVdokXO56TTpPvRtQleJTT.
 * Production scope is limited to the final frames inside the "Light" section.
 */
export const figmaManifest = {
  source: {
    fileKey: "kVdokXO56TTpPvRtQleJTT",
    page: { id: "8411:143671", name: "UI Design 🎨" },
    section: { id: "21428:22397", name: "Light" },
    excludedSections: ["Dark", "Section Components"],
  },
  frames: {
    desktop: {
      id: "21428:22407",
      width: 1440,
      height: 8145,
      headerHeight: 84,
    },
    mobile: {
      id: "21428:22655",
      width: 393,
      height: 9826,
      headerHeight: 64,
    },
  },
  sectionOrder: [
    "hero",
    "client-logos",
    "results",
    "process",
    "services",
    "industries",
    "portfolio",
    "testimonials",
    "faq",
    "contact",
    "footer",
  ],
  typography: {
    display: "Quicksand",
    body: "Quicksand",
    logo: "Outfit",
    auxiliary: "Poppins",
    availableStyles: [
      "Outfit SemiBold",
      "Poppins Regular",
      "Quicksand Bold",
      "Quicksand Medium",
      "Quicksand SemiBold",
    ],
  },
  resolvedLightTokens: {
    colors: {
      canvas: "#ffffff",
      text: "#0a0d12",
      mutedText: "#717680",
      surface: "#fafafa",
      borderStrong: "#dfdfdf",
      borderSubtle: "#dedcdc",
      primary: "#ff623e",
      primaryPressed: "#cc4e32",
      white: "#ffffff",
      black: "#000000",
    },
    radii: { sm: 6, xl: 12, full: 9999 },
    desktop: {
      display3xl: { size: 56, lineHeight: 68 },
      display2xl: { size: 48, lineHeight: 60 },
      displayXl: { size: 40, lineHeight: 56 },
      displayLg: { size: 36, lineHeight: 44 },
      textXl: { size: 20, lineHeight: 34 },
      textLg: { size: 18, lineHeight: 32 },
      textMd: { size: 16, lineHeight: 30 },
      textSm: { size: 14, lineHeight: 28 },
    },
  },
  states: {
    mobileMenu: ["closed", "open"],
    industry: ["fintech", "e-commerce", "healtcare"],
    faq: ["collapsed", "expanded"],
    contactForm: ["idle", "invalid", "submitting", "success"],
    testimonial: ["previous", "current", "next"],
    theme: "light-only",
  },
  copy: {
    navigation: ["About", "Service", "Projects", "Testimonials", "FAQ"],
    hero: {
      title: "Your Tech Partner for Smarter Growth",
      description:
        "We deliver tailored IT solutions to help you scale with speed and confidence.",
      cta: "Let’s Talk",
    },
    sectionHeadings: [
      "Trusted by Global Innovators & Leading Brands",
      "End-to-End IT Solutions That Drive Results",
      "Our Process",
      "Smart IT Solutions That Grow With You",
      "Built for Your Industry",
      "From Vision to Launch! Projects We’re Proud Of",
      "What Partners Say About Working With Us",
      "Need Help? Start Here.",
      "Ready to Start? Let’s Talk.",
      "LET'S DISCUSS YOUR IDEAS",
    ],
    process: [
      ["Discovery & Consultation", "Understand Your Needs & Goals"],
      ["Planning & Strategy", "Build a Clear, Scalable Roadmap"],
      ["Design & Prototyping", "Craft UX That Converts"],
      ["Development & Implementation", "Deliver With Speed & Precision"],
      ["Testing & Optimization", "Ensure Quality at Every Step"],
      ["Launch & Growth", "Scale, Measure & Improve Continuously"],
    ],
    services: [
      ["Web Development", "Build fast, scalable, and SEO-friendly websites."],
      [
        "Mobile App Development",
        "Native & cross-platform apps tailored to user needs.",
      ],
      ["UI/UX Design", "Delight users with intuitive and beautiful interfaces"],
      [
        "Cloud Solutions",
        "Secure and flexible cloud infrastructure for your growth.",
      ],
      [
        "Software Development",
        "Custom solutions built around your business logic.",
      ],
      [
        "IT Infrastructure",
        "Scale your backend with reliable tech foundations.",
      ],
      [
        "Cybersecurity Services",
        "Stay protected with enterprise-grade security.",
      ],
      ["QA Solutions", "Ensure performance with rigorous testing frameworks."],
      [
        "IT Consulting & Support",
        "Make smarter tech decisions with expert guidance.",
      ],
    ],
    industries: ["Fintech", "E-Commerce", "Healtcare"],
    portfolio: ["Landing Page", "Portofolio 1", "Portofolio 2", "Portofolio 3"],
    faq: [
      "What services do you offer?",
      "How do I know if this is right for my business?",
      "How much does a project cost?",
      "How long does it take?",
      "Can I start with a small project first?",
    ],
    form: {
      fields: ["Name", "Email", "Message", "Services"],
      placeholders: [
        "Enter your name",
        "Enter your email",
        "Enter your message",
      ],
      services: [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Cloud Solutions",
        "Software Development",
        "Other",
      ],
      submit: "Send",
    },
  },
  assets: {
    hero: "src/assets/images/hero/hero-tech-partner.png",
    industry: "src/assets/images/industries/fintech.png",
    portfolio: [
      "src/assets/images/portfolio/landing-page.png",
      "src/assets/images/portfolio/portfolio-2.png",
      "src/assets/images/portfolio/portfolio-3.png",
    ],
    testimonials: [
      "src/assets/images/testimonials/john-lee.png",
      "src/assets/images/testimonials/sarah-tan.png",
      "src/assets/images/testimonials/emily-chen.png",
    ],
    consultation:
      "src/assets/images/consultation/free-consultation.png",
    serviceDirectory: "src/assets/images/services",
    logoDirectory: "src/assets/icons/logos",
    iconDirectory: "src/assets/icons/ui",
    fontDirectory: "src/assets/fonts",
  },
} as const;
