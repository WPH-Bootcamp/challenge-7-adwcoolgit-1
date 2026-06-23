import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { portfolioItems } from "../../data/sections";
import { SectionHeading } from "../ui";

export function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto h-[1568px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[74px] desktop:h-[772px] desktop:max-w-290 desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.portfolio}
    >
      <SectionHeading
        headingId="portfolio-heading"
        subtitle={sectionCopy.portfolio.subtitle}
        title={sectionCopy.portfolio.title}
      />
      <ul className="mt-6 grid gap-5 desktop:mt-16 desktop:grid-cols-3 desktop:gap-[20.5px]">
        {portfolioItems.map((item) => (
          <li key={item.id}>
            <article
              className="h-[427px] w-full desktop:h-[449px] desktop:w-[373px]"
              data-ui="portfolio-card"
            >
              <div className="h-[361px] w-full overflow-hidden rounded-2xl bg-surface desktop:h-[373px] desktop:w-[373px]">
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
                <p className="mt-3 text-sm font-medium leading-7 text-primary desktop:text-base desktop:leading-[30px]">
                  {item.category}
                </p>
              ) : null}
              <h3 className="text-base font-bold leading-[30px] desktop:text-xl desktop:leading-[34px]">
                {item.title}
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
