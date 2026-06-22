import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { portfolioItems } from "../../data/sections";
import { SectionHeading } from "../ui";

export function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-40"
      id={sectionIds.portfolio}
    >
      <SectionHeading
        headingId="portfolio-heading"
        subtitle={sectionCopy.portfolio.subtitle}
        title={sectionCopy.portfolio.title}
      />
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 desktop:mt-14 desktop:grid-cols-3 desktop:gap-6">
        {portfolioItems.map((item) => (
          <li key={item.id}>
            <article>
              <div className="aspect-square overflow-hidden rounded-xl bg-surface">
                <img
                  alt={item.image.alt}
                  className="size-full object-cover"
                  height={item.image.height}
                  loading="lazy"
                  src={item.image.src}
                  width={item.image.width}
                />
              </div>
              {item.category ? (
                <p className="mt-4 text-sm font-semibold text-primary">
                  {item.category}
                </p>
              ) : null}
              <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
