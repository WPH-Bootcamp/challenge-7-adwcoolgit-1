import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { industries } from "../../data/sections";
import { SectionHeading } from "../ui";

export function IndustriesSection() {
  const selectedIndustry = industries[0];

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
        <ul className="flex gap-4 overflow-hidden desktop:block desktop:space-y-5">
          {industries.map((industry, index) => (
            <li
              className={[
                "shrink-0 border-l-4 pl-2 text-sm font-bold desktop:pl-3 desktop:text-lg",
                index === 0
                  ? "border-primary text-ink"
                  : "border-border text-muted/60",
              ].join(" ")}
              key={industry.id}
            >
              {industry.name}
            </li>
          ))}
        </ul>
        <div>
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
