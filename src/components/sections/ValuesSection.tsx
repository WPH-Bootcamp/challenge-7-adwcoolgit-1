import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { values } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ValuesSection() {
  return (
    <section
      aria-labelledby="results-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-36"
      id={sectionIds.results}
    >
      <SectionHeading
        headingId="results-heading"
        subtitle={sectionCopy.results.subtitle}
        title={sectionCopy.results.title}
      />
      <ul className="mx-auto mt-10 grid max-w-150 grid-cols-2 gap-3 sm:gap-5 desktop:mt-16 desktop:max-w-none desktop:grid-cols-4">
        {values.map((item) => (
          <li
            className="flex aspect-square items-center justify-center rounded-full border border-border bg-surface text-center"
            key={item.id}
          >
            <div className="px-5">
              <p className="text-2xl font-bold text-primary sm:text-4xl desktop:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-[0.65rem] font-semibold sm:text-sm desktop:mt-3 desktop:text-base">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
