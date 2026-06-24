import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { portfolioItems } from "../../data/sections";
import { SectionHeading } from "../ui";

export function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto h-[1568px] w-[calc(100%-32px)] max-w-[361px] md:max-w-[720px] scroll-mt-header-mobile px-0 pt-[74px] lg:h-[772px] lg:max-w-290 xl:max-w-290 lg:scroll-mt-header-desktop lg:py-20"
      id={sectionIds.portfolio}
    >
      <SectionHeading
        headingId="portfolio-heading"
        subtitle={sectionCopy.portfolio.subtitle}
        title={sectionCopy.portfolio.title}
      />
      <ul className="mt-6 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-[20.5px]">
        {portfolioItems.map((item) => (
          <li key={item.id}>
            <article
              className="h-[427px] w-full lg:h-[449px] lg:w-[373px]"
              data-ui="portfolio-card"
            >
              <div className="h-[361px] w-full overflow-hidden rounded-2xl bg-surface lg:h-[373px] lg:w-[373px]">
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
                <p className="mt-3 text-sm font-medium leading-7 text-primary lg:text-base lg:leading-[30px]">
                  {item.category}
                </p>
              ) : null}
              <h3 className="text-base font-bold leading-[30px] lg:text-xl lg:leading-[34px]">
                {item.title}
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
