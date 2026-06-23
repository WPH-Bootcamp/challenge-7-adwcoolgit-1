import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { industries } from "../../data/sections";
import { SectionHeading } from "../ui";
import { useState } from "react";

export function IndustriesSection() {
  const [selectedId, setSelectedId] = useState<string>(industries[0].id);
  const selectedIndustry =
    industries.find((industry) => industry.id === selectedId) ?? industries[0];

  const selectByIndex = (index: number) => {
    const next = industries[index];
    setSelectedId(next.id);
    requestAnimationFrame(() =>
      document.getElementById(`industry-tab-${next.id}`)?.focus(),
    );
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const keyTargets: Record<string, number> = {
      ArrowDown: (index + 1) % industries.length,
      ArrowRight: (index + 1) % industries.length,
      ArrowUp: (index - 1 + industries.length) % industries.length,
      ArrowLeft: (index - 1 + industries.length) % industries.length,
      Home: 0,
      End: industries.length - 1,
    };
    const target = keyTargets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    selectByIndex(target);
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="mx-auto h-[655px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[75px] desktop:h-[758px] desktop:max-w-290 desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.industries}
    >
      <SectionHeading
        align="left"
        headingId="industries-heading"
        subtitle={sectionCopy.industries.subtitle}
        title={sectionCopy.industries.title}
      />
      <div className="mt-6 grid gap-6 desktop:mt-16 desktop:grid-cols-[256px_840px] desktop:gap-16">
        <ul
          aria-label="Industries"
          className="block h-[114px] space-y-3 overflow-hidden desktop:h-auto desktop:space-y-2"
          role="tablist"
        >
          {industries.map((industry, index) => (
            <li key={industry.id} role="presentation">
              <button
                aria-selected={industry.id === selectedId}
                aria-controls="industry-panel"
                className={[
                  "h-[30px] w-full shrink-0 border-l-4 pl-2 text-left text-base font-bold leading-[30px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary desktop:h-12 desktop:pl-3 desktop:text-lg desktop:leading-8",
                  industry.id === selectedId
                    ? "border-primary text-ink"
                    : "border-border text-muted/60 hover:text-ink",
                ].join(" ")}
                id={`industry-tab-${industry.id}`}
                onClick={() => setSelectedId(industry.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                role="tab"
                tabIndex={industry.id === selectedId ? 0 : -1}
                type="button"
              >
                {industry.name}
              </button>
            </li>
          ))}
        </ul>
        <div
          aria-labelledby={`industry-tab-${selectedIndustry.id}`}
          className="min-w-0"
          id="industry-panel"
          role="tabpanel"
        >
          <p className="h-[84px] max-w-none text-sm font-medium leading-7 desktop:h-auto desktop:max-w-[840px] desktop:text-base desktop:leading-[30px]">
            {selectedIndustry.description}
          </p>
          <div className="mt-5 h-[200px] overflow-hidden rounded-xl desktop:h-[351px] desktop:w-[840px]">
            <img
              alt={selectedIndustry.image.alt}
              className="relative -left-5 -top-[101px] size-[401px] max-w-none object-cover desktop:-left-px desktop:-top-[61px] desktop:h-[466px] desktop:w-[842px]"
              data-ui="industry-image"
              height={selectedIndustry.image.height}
              loading="lazy"
              src={selectedIndustry.image.src}
              width={selectedIndustry.image.width}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
