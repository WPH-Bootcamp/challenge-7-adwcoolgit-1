import consultationImage from "../assets/images/consultation/free-consultation.png";
import fintechImage from "../assets/images/industries/fintech.png";
import landingPageImage from "../assets/images/portfolio/landing-page.png";
import portfolioTwoImage from "../assets/images/portfolio/portfolio-2.png";
import portfolioThreeImage from "../assets/images/portfolio/portfolio-3.png";
import cloudIcon from "../assets/images/services/cloud.png";
import consultingIcon from "../assets/images/services/consulting.png";
import cybersecurityIcon from "../assets/images/services/cybersecurity.png";
import infrastructureIcon from "../assets/images/services/infrastructure.png";
import mobileAppIcon from "../assets/images/services/mobile-app.png";
import qaIcon from "../assets/images/services/qa.png";
import softwareIcon from "../assets/images/services/software.png";
import uiUxIcon from "../assets/images/services/ui-ux.png";
import webDevelopmentIcon from "../assets/images/services/web-development.png";
import emilyAvatar from "../assets/images/testimonials/emily-chen.png";
import johnAvatar from "../assets/images/testimonials/john-lee.png";
import sarahAvatar from "../assets/images/testimonials/sarah-tan.png";
import client02 from "../assets/icons/logos/client-02.svg";
import client01 from "../assets/icons/logos/client-01.svg";
import client03 from "../assets/icons/logos/client-03.svg";
import client04 from "../assets/icons/logos/client-04.svg";
import client05 from "../assets/icons/logos/client-05.svg";
import client06 from "../assets/icons/logos/client-06.svg";
import client07 from "../assets/icons/logos/client-07.svg";
import client08 from "../assets/icons/logos/client-08.svg";
import client09 from "../assets/icons/logos/client-09.svg";
import type {
  ClientLogo,
  DisplayMedia,
  FaqItem,
  IndustryItem,
  MediaAsset,
  PortfolioItem,
  ProcessStep,
  ServiceItem,
  ServiceOption,
  Testimonial,
  ValueItem,
} from "../types";

const image = (
  src: string,
  alt: string,
  width: number,
  height: number,
  loading: "eager" | "lazy" = "lazy",
  display?: DisplayMedia,
): MediaAsset => ({
  src,
  alt,
  width,
  height,
  loading,
  ...display,
});

export const clientLogos = [
  { id: "logo-1", name: "Client 1", image: image(client01, "Client 1", 133, 48) },
  { id: "upwork", name: "Upwork", image: image(client02, "Upwork", 114, 48) },
  { id: "zoom", name: "Zoom", image: image(client03, "Zoom", 98, 48) },
  {
    id: "postman",
    name: "Postman",
    image: image(client04, "Postman", 152, 48),
  },
  {
    id: "databricks",
    name: "Databricks",
    image: image(client05, "Databricks", 178, 48),
  },
  { id: "airbnb", name: "Airbnb", image: image(client06, "Airbnb", 128, 48) },
  {
    id: "dropbox",
    name: "Dropbox",
    image: image(client07, "Dropbox", 163, 48),
  },
  { id: "paypal", name: "PayPal", image: image(client08, "PayPal", 143, 48) },
  { id: "slack", name: "Slack", image: image(client09, "Slack", 111, 48) },
] as const satisfies readonly ClientLogo[];

export const values = [
  { id: "projects", value: "50+", label: "Projects Delivered" },
  { id: "experience", value: "5+", label: "Years of Experience" },
  { id: "awards", value: "10+", label: "Industry Awards Won" },
  { id: "satisfaction", value: "100%", label: "Client Satisfaction Rate" },
] as const satisfies readonly ValueItem[];

export const processSteps = [
  {
    id: "discovery",
    number: "1",
    title: "Discovery & Consultation",
    description: "Understand Your Needs & Goals",
    side: "left",
  },
  {
    id: "planning",
    number: "2",
    title: "Planning & Strategy",
    description: "Build a Clear, Scalable Roadmap",
    side: "right",
  },
  {
    id: "design",
    number: "3",
    title: "Design & Prototyping",
    description: "Craft UX That Converts",
    side: "left",
  },
  {
    id: "development",
    number: "4",
    title: "Development & Implementation",
    description: "Deliver With Speed & Precision",
    side: "right",
  },
  {
    id: "testing",
    number: "5",
    title: "Testing & Optimization",
    description: "Ensure Quality at Every Step",
    side: "left",
  },
  {
    id: "launch",
    number: "6",
    title: "Launch & Growth",
    description: "Scale, Measure & Improve Continuously",
    side: "right",
  },
] as const satisfies readonly ProcessStep[];

export const services = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Build fast, scalable, and SEO-friendly websites.",
    icon: image(webDevelopmentIcon, "", 1024, 1024),
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native & cross-platform apps tailored to user needs.",
    icon: image(mobileAppIcon, "", 1024, 1024),
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Delight users with intuitive and beautiful interfaces",
    icon: image(uiUxIcon, "", 1024, 1024),
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Secure and flexible cloud infrastructure for your growth.",
    icon: image(cloudIcon, "", 1024, 1024),
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Custom solutions built around your business logic.",
    icon: image(softwareIcon, "", 1024, 1024),
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure",
    description: "Scale your backend with reliable tech foundations.",
    icon: image(infrastructureIcon, "", 1024, 1024),
  },
  {
    id: "cybersecurity-services",
    title: "Cybersecurity Services",
    description: "Stay protected with enterprise-grade security.",
    icon: image(cybersecurityIcon, "", 1024, 1024),
  },
  {
    id: "qa-solutions",
    title: "QA Solutions",
    description: "Ensure performance with rigorous testing frameworks.",
    icon: image(qaIcon, "", 1024, 1024),
  },
  {
    id: "it-consulting-support",
    title: "IT Consulting & Support",
    description: "Make smarter tech decisions with expert guidance.",
    icon: image(consultingIcon, "", 1024, 1024),
  },
] as const satisfies readonly ServiceItem[];

export const industries = [
  {
    id: "fintech",
    name: "Fintech",
    description:
      "We build secure, scalable, and compliant fintech solutions — from digital wallets to core banking systems — tailored to modern financial needs.",
    image: image(
      fintechImage,
      "A payment card being used at a terminal",
      1200,
      1200,
      "lazy",
      {
        displayWidth: 840,
        displayHeight: 351,
        objectPosition: "50% 50%",
      },
    ),
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    description:
      "We create reliable commerce experiences that help brands sell, operate, and grow across channels.",
    image: image(
      fintechImage,
      "Digital commerce technology",
      1200,
      1200,
      "lazy",
      {
        displayWidth: 840,
        displayHeight: 351,
        objectPosition: "50% 50%",
      },
    ),
  },
  {
    id: "healtcare",
    name: "Healtcare",
    description:
      "We deliver dependable digital tools that support care teams, operations, and patient experiences.",
    image: image(
      fintechImage,
      "Digital healthcare technology",
      1200,
      1200,
      "lazy",
      {
        displayWidth: 840,
        displayHeight: 351,
        objectPosition: "50% 50%",
      },
    ),
  },
] as const satisfies readonly IndustryItem[];

export const portfolioItems = [
  {
    id: "portfolio-1",
    title: "Portofolio 1",
    category: "Landing Page",
    image: image(landingPageImage, "Willy Nielsen portfolio landing page", 1280, 1280),
  },
  {
    id: "portfolio-2",
    title: "Portofolio 2",
    category: "Landing Page",
    image: image(portfolioTwoImage, "Green software portfolio landing page", 746, 746),
  },
  {
    id: "portfolio-3",
    title: "Portofolio 3",
    category: "Landing Page",
    image: image(portfolioThreeImage, "Designer portfolio landing page", 1280, 1280),
  },
] as const satisfies readonly PortfolioItem[];

export const testimonials = [
  {
    id: "john-lee",
    quote:
      "A game-changer for our project. They turned it into reality efficiently and effectively.",
    authorName: "John Lee",
    authorRole: "Director",
    company: "Innovate Corp",
    avatar: image(johnAvatar, "John Lee", 300, 300, "lazy", {
      displayWidth: 48,
      displayHeight: 48,
      objectPosition: "50% 50%",
    }),
  },
  {
    id: "sarah-tan",
    quote:
      "The team delivered exactly what we needed — on time and with outstanding quality. Their attention to detail and communication were top-notch.",
    authorName: "Sarah Tan",
    authorRole: "Product Manager",
    company: "Finovate",
    avatar: image(sarahAvatar, "Sarah Tan", 300, 300, "lazy", {
      displayWidth: 48,
      displayHeight: 48,
      objectPosition: "50% 50%",
    }),
  },
  {
    id: "emily-chen",
    quote:
      "The collaboration was seamless and exceeded expectations. Their expertise transformed our project into a successful product.",
    authorName: "Emily Chen",
    authorRole: "Marketing Head",
    company: "Tech",
    avatar: image(emilyAvatar, "Emily Chen", 300, 300, "lazy", {
      displayWidth: 48,
      displayHeight: 48,
      objectPosition: "50% 50%",
    }),
  },
] as const satisfies readonly Testimonial[];

export const faqs = [
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "We provide custom web/app development, cloud solutions, UX/UI design, and more.",
  },
  {
    id: "business-fit",
    question: "How do I know if this is right for my business?",
    answer:
      "We start by understanding your goals, constraints, and users, then recommend the smallest useful path forward.",
  },
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "Project cost depends on scope, timeline, and technical complexity. We provide a clear estimate after discovery.",
  },
  {
    id: "timeline",
    question: "How long does it take?",
    answer:
      "Timelines vary by scope. After discovery, we provide milestones and a delivery schedule tailored to the project.",
  },
  {
    id: "small-project",
    question: "Can I start with a small project first?",
    answer:
      "Yes. A focused first engagement is a practical way to validate the collaboration before expanding the scope.",
  },
] as const satisfies readonly FaqItem[];

export const serviceOptions = [
  { id: "web", label: "Web Development", value: "web-development" },
  {
    id: "mobile",
    label: "Mobile App Development",
    value: "mobile-app-development",
  },
  { id: "ui-ux", label: "UI/UX Design", value: "ui-ux-design" },
  { id: "cloud", label: "Cloud Solutions", value: "cloud-solutions" },
  {
    id: "software",
    label: "Software Development",
    value: "software-development",
  },
  { id: "other", label: "Other", value: "other" },
] as const satisfies readonly ServiceOption[];

export const consultationMedia = image(
  consultationImage,
  "A team discussing a project around a conference table",
  1200,
  655,
);
