import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { values } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ValuesSection() {
  return (
    <section
      aria-labelledby="results-heading"
      className="mx-auto h-[688px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[115px] sm:h-auto sm:max-w-[420px] sm:pt-[110px] md:h-auto md:max-w-[720px] md:pt-[112px] lg:h-[598px] lg:max-w-290 lg:scroll-mt-header-desktop lg:py-20 xl:max-w-290"
      id={sectionIds.results}
    >
      <SectionHeading
        headingId="results-heading"
        subtitle={sectionCopy.results.subtitle}
        title={sectionCopy.results.title}
      />
      <ul className="mx-auto mt-6 grid max-w-none grid-cols-2 justify-items-center gap-4 sm:gap-[18px] md:mt-10 md:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-5 xl:gap-5">
        {values.map((item) => (
          <li
            className="flex aspect-square size-full items-center justify-center rounded-full border border-border bg-surface text-center sm:size-[180px] md:size-[220px] lg:size-[275px] xl:size-[275px]"
            data-ui="stat-card"
            key={item.id}
          >
            <div className="px-5">
              <p className="text-2xl font-bold leading-[38px] text-primary sm:text-[32px] sm:leading-[44px] md:text-[40px] md:leading-[52px] lg:text-5xl lg:leading-[60px] lg:tracking-[-0.96px] xl:text-5xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold leading-6 sm:text-sm sm:leading-7 md:text-lg md:leading-8 lg:mt-1.5 lg:text-xl lg:leading-[34px] xl:text-xl">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
