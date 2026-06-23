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
      className="mx-4 mt-6 h-[528px] max-w-none rounded-footer border border-border bg-surface p-5 desktop:mx-auto desktop:mb-10 desktop:mt-10 desktop:h-[328px] desktop:w-[1160px] desktop:p-10"
      id={sectionIds.footer}
    >
      <div className="flex h-[124px] flex-col gap-3 desktop:h-auto desktop:flex-row desktop:items-start desktop:justify-between desktop:gap-8">
        <p className="order-2 w-[281px] max-w-none text-[28px] font-bold leading-[38px] tracking-[-0.02em] desktop:order-1 desktop:text-4xl desktop:leading-[44px] desktop:tracking-[-0.72px]">
          {companyIdentity.footerStatement}
        </p>
        <a
          aria-label={`${companyIdentity.name} home`}
          className="order-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 desktop:order-2"
          href="#hero"
          onClick={handleSectionLink}
        >
          <BrandLogo className="text-ink" />
        </a>
      </div>

      <div className="my-6 h-px bg-border-subtle desktop:my-[59.5px]" />

      <div className="flex h-[308px] flex-col gap-6 desktop:h-auto desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-8">
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-y-2 desktop:flex-row desktop:gap-y-0">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="flex h-9 items-center rounded-pill px-0 text-sm font-medium leading-7 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary desktop:px-4 desktop:text-base desktop:leading-[30px]"
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
                className="flex size-10 items-center justify-center rounded-full border border-border bg-canvas transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
