import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { services } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto h-[1921px] w-[calc(100%-32px)] max-w-[361px] md:max-w-[720px] scroll-mt-header-mobile px-0 pt-[75px] lg:h-[949px] lg:max-w-290 xl:max-w-290 lg:scroll-mt-header-desktop lg:py-20"
      id={sectionIds.services}
    >
      <SectionHeading
        headingId="services-heading"
        subtitle={sectionCopy.services.subtitle}
        title={sectionCopy.services.title}
      />
      <ul className="mt-[39px] grid gap-10 lg:mt-[63px] lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
        {services.map((service, index) => (
          <li
            className={[
              "relative flex w-full items-start gap-4 rounded-2xl border border-border bg-surface px-[19px] pb-5 pt-[46px] shadow-card lg:block lg:h-[182px] lg:w-[373.333px] lg:px-5 lg:pt-16",
              index === 0 || index === 6 ? "h-[130px]" : "h-[158px]",
            ].join(" ")}
            data-ui="service-card"
            key={service.id}
          >
            <img
              alt=""
              className="absolute -top-[22px] left-5 size-[68px] shrink-0 object-contain lg:-top-[27px] lg:left-[19px] lg:size-20"
              height={service.icon.height}
              loading="lazy"
              src={service.icon.src}
              width={service.icon.width}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold leading-[30px] lg:text-xl lg:leading-[34px]">
                {service.title}
              </h3>
              <p className="text-sm font-medium leading-7 text-muted lg:text-base lg:leading-[30px]">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
