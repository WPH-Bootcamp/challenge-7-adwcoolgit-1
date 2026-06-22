import { BrandLogo, Button, SectionHeading } from "../components/ui";
import {
  companyIdentity,
  sectionCopy,
} from "../data/company";
import {
  headerCallToAction,
  primaryNavigation,
  sectionIds,
} from "../data/navigation";

const foundationalSections = [
  {
    id: sectionIds.clients,
    title: sectionCopy.clients.title,
    subtitle: undefined,
  },
  {
    id: sectionIds.results,
    title: sectionCopy.results.title,
    subtitle: sectionCopy.results.subtitle,
  },
  {
    id: sectionIds.process,
    title: sectionCopy.process.title,
    subtitle: sectionCopy.process.subtitle,
  },
  {
    id: sectionIds.services,
    title: sectionCopy.services.title,
    subtitle: sectionCopy.services.subtitle,
  },
  {
    id: sectionIds.industries,
    title: sectionCopy.industries.title,
    subtitle: sectionCopy.industries.subtitle,
  },
  {
    id: sectionIds.portfolio,
    title: sectionCopy.portfolio.title,
    subtitle: sectionCopy.portfolio.subtitle,
  },
  {
    id: sectionIds.testimonials,
    title: sectionCopy.testimonials.title,
    subtitle: sectionCopy.testimonials.subtitle,
  },
  {
    id: sectionIds.faq,
    title: sectionCopy.faq.title,
    subtitle: sectionCopy.faq.subtitle,
  },
  {
    id: sectionIds.contact,
    title: sectionCopy.contact.title,
    subtitle: sectionCopy.contact.subtitle,
  },
] as const;

export function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-border-subtle bg-canvas">
        <div className="mx-auto flex min-h-header-mobile max-w-300 items-center justify-between px-page desktop:min-h-header-desktop desktop:px-page-desktop">
          <a
            aria-label={`${companyIdentity.name} home`}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            href="#hero"
          >
            <BrandLogo compact />
          </a>
          <nav aria-label="Primary" className="hidden desktop:block">
            <ul className="flex items-center gap-8">
              {primaryNavigation.map((item) => (
                <li key={item.id}>
                  <a
                    className="rounded-sm text-sm font-medium hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={headerCallToAction.href} size="sm">
            {headerCallToAction.label}
          </Button>
        </div>
      </header>

      <main>
        <section
          aria-labelledby="hero-heading"
          className="mx-auto max-w-300 px-page py-section desktop:px-page-desktop desktop:py-section-desktop"
          id={sectionIds.hero}
        >
          <h1
            className="max-w-3xl text-display-lg font-bold tracking-[-0.03em] desktop:text-display-3xl"
            id="hero-heading"
          >
            {companyIdentity.pageTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-body-md text-muted">
            {companyIdentity.pageDescription}
          </p>
        </section>

        {foundationalSections.map((section) => (
          <section
            aria-labelledby={`${section.id}-heading`}
            className="mx-auto max-w-300 scroll-mt-header-mobile px-page py-12 desktop:scroll-mt-header-desktop desktop:px-page-desktop desktop:py-16"
            id={section.id}
            key={section.id}
          >
            <SectionHeading
              headingId={`${section.id}-heading`}
              subtitle={section.subtitle}
              title={section.title}
            />
          </section>
        ))}
      </main>

      <footer
        className="mx-auto max-w-300 border-t border-border-subtle px-page py-10 desktop:px-page-desktop"
        id={sectionIds.footer}
      >
        <div className="flex items-start justify-between gap-8">
          <p className="max-w-64 font-display text-2xl font-bold">
            {companyIdentity.footerStatement}
          </p>
          <a
            aria-label={`${companyIdentity.name} home`}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            href="#hero"
          >
            <BrandLogo />
          </a>
        </div>
      </footer>
    </div>
  );
}
