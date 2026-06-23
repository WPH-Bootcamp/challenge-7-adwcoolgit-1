import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { services } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto h-[1921px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[75px] desktop:h-[949px] desktop:max-w-290 desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.services}
    >
      <SectionHeading
        headingId="services-heading"
        subtitle={sectionCopy.services.subtitle}
        title={sectionCopy.services.title}
      />
      <ul className="mt-[39px] grid gap-10 desktop:mt-[63px] desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-10">
        {services.map((service, index) => (
          <li
            className={[
              "relative flex w-full items-start gap-4 rounded-2xl border border-border bg-surface px-[19px] pb-5 pt-[46px] shadow-card desktop:block desktop:h-[182px] desktop:w-[373.333px] desktop:px-5 desktop:pt-16",
              index === 0 || index === 6 ? "h-[130px]" : "h-[158px]",
            ].join(" ")}
            data-ui="service-card"
            key={service.id}
          >
            <img
              alt=""
              className="absolute -top-[22px] left-5 size-[68px] shrink-0 object-contain desktop:-top-[27px] desktop:left-[19px] desktop:size-20"
              height={service.icon.height}
              loading="lazy"
              src={service.icon.src}
              width={service.icon.width}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold leading-[30px] desktop:text-xl desktop:leading-[34px]">
                {service.title}
              </h3>
              <p className="text-sm font-medium leading-7 text-muted desktop:text-base desktop:leading-[30px]">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
