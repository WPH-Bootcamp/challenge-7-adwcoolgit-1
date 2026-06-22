import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { services } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-40 desktop:px-0"
      id={sectionIds.services}
    >
      <SectionHeading
        headingId="services-heading"
        subtitle={sectionCopy.services.subtitle}
        title={sectionCopy.services.title}
      />
      <ul className="mt-14 grid gap-5 desktop:grid-cols-3">
        {services.map((service) => (
          <li
            className="min-h-46 rounded-xl border border-border bg-surface px-5 py-5 shadow-card"
            key={service.id}
          >
            <img
              alt=""
              className="size-14 object-contain"
              height={service.icon.height}
              loading="lazy"
              src={service.icon.src}
              width={service.icon.width}
            />
            <h3 className="mt-4 text-base font-bold">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
