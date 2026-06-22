import facebookIcon from "../../assets/icons/social/facebook.svg";
import instagramIcon from "../../assets/icons/social/instagram.svg";
import linkedinIcon from "../../assets/icons/social/linkedin.svg";
import xIcon from "../../assets/icons/social/x.svg";
import { companyIdentity } from "../../data/company";
import { primaryNavigation, sectionIds } from "../../data/navigation";
import { BrandLogo } from "../ui";
import { handleSectionLink } from "../../lib";

const socialLinks = [
  { id: "facebook", label: "Facebook", href: "https://facebook.com", icon: facebookIcon },
  { id: "instagram", label: "Instagram", href: "https://instagram.com", icon: instagramIcon },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", icon: linkedinIcon },
  { id: "x", label: "X", href: "https://x.com", icon: xIcon },
] as const;

export function SiteFooter() {
  return (
    <footer
      className="mx-page mb-6 max-w-300 rounded-xl border border-border bg-surface px-5 py-7 sm:mx-8 sm:px-8 sm:py-10 desktop:mx-auto desktop:mb-20 desktop:px-10 desktop:py-12"
      id={sectionIds.footer}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <p className="max-w-64 text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl desktop:text-3xl">
          {companyIdentity.footerStatement}
        </p>
        <a
          aria-label={`${companyIdentity.name} home`}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          href="#hero"
          onClick={handleSectionLink}
        >
          <BrandLogo />
        </a>
      </div>

      <div className="my-7 h-px bg-border-subtle desktop:my-10" />

      <div className="flex flex-col gap-8 desktop:flex-row desktop:items-center desktop:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="rounded-sm text-xs font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  href={item.href}
                  onClick={handleSectionLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <li key={social.id}>
              <a
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-canvas transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href={social.href}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" className="size-4 object-contain" src={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
