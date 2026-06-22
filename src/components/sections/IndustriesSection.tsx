import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { industries } from "../../data/sections";
import { SectionHeading } from "../ui";

export function IndustriesSection() {
  const selectedIndustry = industries[0];

  return (
    <section
      aria-labelledby="industries-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-40 desktop:px-0"
      id={sectionIds.industries}
    >
      <SectionHeading
        align="left"
        headingId="industries-heading"
        subtitle={sectionCopy.industries.subtitle}
        title={sectionCopy.industries.title}
      />
      <div className="mt-14 grid gap-10 desktop:grid-cols-[260px_1fr]">
        <ul className="space-y-5">
          {industries.map((industry, index) => (
            <li
              className={[
                "border-l-4 pl-3 text-lg font-bold",
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
          <p className="max-w-205 text-base font-medium leading-7">
            {selectedIndustry.description}
          </p>
          <img
            alt={selectedIndustry.image.alt}
            className="mt-6 aspect-[2.35/1] w-full rounded-xl object-cover object-[center_55%]"
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
