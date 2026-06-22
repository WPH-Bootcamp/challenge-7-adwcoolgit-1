import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { services } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-40"
      id={sectionIds.services}
    >
      <SectionHeading
        headingId="services-heading"
        subtitle={sectionCopy.services.subtitle}
        title={sectionCopy.services.title}
      />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 desktop:mt-14 desktop:grid-cols-3 desktop:gap-5">
        {services.map((service) => (
          <li
            className="flex min-h-28 items-start gap-4 rounded-xl border border-border bg-surface px-4 py-4 shadow-card desktop:block desktop:min-h-46 desktop:px-5 desktop:py-5"
            key={service.id}
          >
            <img
              alt=""
              className="size-11 shrink-0 object-contain desktop:size-14"
              height={service.icon.height}
              loading="lazy"
              src={service.icon.src}
              width={service.icon.width}
            />
            <div>
              <h3 className="text-sm font-bold desktop:mt-4 desktop:text-base">
                {service.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted desktop:mt-2 desktop:text-sm desktop:leading-6">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
