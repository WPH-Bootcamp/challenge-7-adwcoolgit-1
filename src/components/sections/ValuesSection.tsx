import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { values } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ValuesSection() {
  return (
    <section
      aria-labelledby="results-heading"
      className="mx-auto h-[688px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[115px] desktop:h-[598px] desktop:max-w-290 desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.results}
    >
      <SectionHeading
        headingId="results-heading"
        subtitle={sectionCopy.results.subtitle}
        title={sectionCopy.results.title}
      />
      <ul className="mx-auto mt-6 grid max-w-none grid-cols-2 gap-4 desktop:mt-16 desktop:grid-cols-4 desktop:gap-5">
        {values.map((item) => (
          <li
            className="flex aspect-square size-full items-center justify-center rounded-full border border-border bg-surface text-center desktop:size-[275px]"
            data-ui="stat-card"
            key={item.id}
          >
            <div className="px-5">
              <p className="text-2xl font-bold leading-[38px] text-primary desktop:text-5xl desktop:leading-[60px] desktop:tracking-[-0.96px]">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold leading-6 desktop:mt-1.5 desktop:text-xl desktop:leading-[34px]">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
