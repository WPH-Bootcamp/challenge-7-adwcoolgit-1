import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { industries } from "../../data/sections";
import { SectionHeading } from "../ui";
import { useState } from "react";

export function IndustriesSection() {
  const [selectedId, setSelectedId] = useState<string>(industries[0].id);
  const selectedIndustry =
    industries.find((industry) => industry.id === selectedId) ?? industries[0];

  return (
    <section
      aria-labelledby="industries-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-40"
      id={sectionIds.industries}
    >
      <SectionHeading
        align="left"
        headingId="industries-heading"
        subtitle={sectionCopy.industries.subtitle}
        title={sectionCopy.industries.title}
      />
      <div className="mt-10 grid gap-6 desktop:mt-14 desktop:grid-cols-[260px_1fr] desktop:gap-10">
        <ul
          aria-label="Industries"
          className="flex gap-4 overflow-hidden desktop:block desktop:space-y-5"
          role="tablist"
        >
          {industries.map((industry) => (
            <li key={industry.id} role="presentation">
              <button
                aria-selected={industry.id === selectedId}
                aria-controls="industry-panel"
                className={[
                  "min-h-11 shrink-0 border-l-4 pl-2 text-left text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary desktop:pl-3 desktop:text-lg",
                  industry.id === selectedId
                    ? "border-primary text-ink"
                    : "border-border text-muted/60 hover:text-ink",
                ].join(" ")}
                id={`industry-tab-${industry.id}`}
                onClick={() => setSelectedId(industry.id)}
                role="tab"
                type="button"
              >
                {industry.name}
              </button>
            </li>
          ))}
        </ul>
        <div
          aria-labelledby={`industry-tab-${selectedIndustry.id}`}
          id="industry-panel"
          role="tabpanel"
        >
          <p className="max-w-205 text-sm font-medium leading-6 desktop:text-base desktop:leading-7">
            {selectedIndustry.description}
          </p>
          <img
            alt={selectedIndustry.image.alt}
            className="mt-5 aspect-[1.45/1] w-full rounded-xl object-cover object-[center_55%] desktop:mt-6 desktop:aspect-[2.35/1]"
            height={selectedIndustry.image.height}
            loading="lazy"
            src={selectedIndustry.image.src}
            width={selectedIndustry.image.width}
          />
        </div>
      </div>
    </section>
  );
}
