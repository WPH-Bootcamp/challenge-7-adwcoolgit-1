import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { portfolioItems } from "../../data/sections";
import { SectionHeading } from "../ui";

export function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-40 desktop:px-0"
      id={sectionIds.portfolio}
    >
      <SectionHeading
        headingId="portfolio-heading"
        subtitle={sectionCopy.portfolio.subtitle}
        title={sectionCopy.portfolio.title}
      />
      <ul className="mt-14 grid gap-6 desktop:grid-cols-3">
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
