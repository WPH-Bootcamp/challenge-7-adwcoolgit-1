import { BrandLogo, Button } from "../ui";
import { companyIdentity } from "../../data/company";
import {
  headerCallToAction,
  primaryNavigation,
} from "../../data/navigation";

export function SiteHeader() {
  return (
    <header className="relative z-20 bg-canvas">
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-page desktop:h-21 desktop:px-0">
        <a
          aria-label={`${companyIdentity.name} home`}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          href="#hero"
        >
          <BrandLogo compact />
        </a>

        <nav aria-label="Primary" className="hidden desktop:block">
          <ul className="flex items-center gap-12">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="rounded-sm text-xs font-semibold text-ink transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          className="hidden min-w-50 desktop:inline-flex"
          href={headerCallToAction.href}
          size="sm"
        >
          {headerCallToAction.label}
        </Button>

        <span className="text-xs font-bold desktop:hidden" aria-hidden="true">
          Menu
        </span>
      </div>
    </header>
  );
}
