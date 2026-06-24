import { BrandLogo, Button } from "../ui";
import { companyIdentity } from "../../data/company";
import {
  headerCallToAction,
  primaryNavigation,
} from "../../data/navigation";
import { MobileNavigation } from "./MobileNavigation";
import { handleSectionLink } from "../../lib";

export function SiteHeader() {
  return (
    <header className="relative z-20 bg-canvas lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent lg:backdrop-blur-none">
      <div className="mx-auto flex h-16 w-[calc(100%-32px)] max-w-[361px] items-center justify-between md:max-w-[720px] lg:h-21 lg:w-[calc(100%-64px)] lg:max-w-none xl:w-full xl:max-w-290">
        <a
          aria-label={`${companyIdentity.name} home`}
          className="flex min-h-11 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          href="#hero"
          onClick={handleSectionLink}
        >
          <BrandLogo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="flex h-9 items-center rounded-pill px-4 text-base font-semibold leading-[30px] text-ink transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  href={item.href}
                  onClick={handleSectionLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button
            className="w-[197px]"
            href={headerCallToAction.href}
            onClick={handleSectionLink}
            size="sm"
          >
            {headerCallToAction.label}
          </Button>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
