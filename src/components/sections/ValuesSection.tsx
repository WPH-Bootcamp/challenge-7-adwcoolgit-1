import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { values } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ValuesSection() {
  return (
    <section
      aria-labelledby="results-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-36 desktop:px-0"
      id={sectionIds.results}
    >
      <SectionHeading
        headingId="results-heading"
        subtitle={sectionCopy.results.subtitle}
        title={sectionCopy.results.title}
      />
      <ul className="mt-16 grid grid-cols-2 gap-5 desktop:grid-cols-4">
        {values.map((item) => (
          <li
            className="flex aspect-square items-center justify-center rounded-full border border-border bg-surface text-center"
            key={item.id}
          >
            <div className="px-5">
              <p className="text-4xl font-bold text-primary desktop:text-5xl">
                {item.value}
              </p>
              <p className="mt-3 text-sm font-semibold desktop:text-base">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
