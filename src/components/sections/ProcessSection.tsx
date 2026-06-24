import chevronIcon from "../../assets/icons/ui/chevron.svg";
import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { processSteps } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="mx-auto h-[853px] w-[calc(100%-32px)] max-w-[361px] md:max-w-[720px] scroll-mt-header-mobile px-0 pt-[76px] lg:h-[1099px] lg:max-w-290 xl:max-w-290 lg:scroll-mt-header-desktop lg:py-20"
      id={sectionIds.process}
    >
      <SectionHeading
        headingId="process-heading"
        subtitle={sectionCopy.process.subtitle}
        title={sectionCopy.process.title}
      />
      <ol className="relative mt-[22px] space-y-4 pl-[52px] lg:mt-16 lg:grid lg:grid-rows-6 lg:gap-4 lg:space-y-0 lg:pl-0">
        <span
          aria-hidden="true"
          className="absolute bottom-[58px] left-5 top-[58px] block w-px -translate-x-1/2 bg-border lg:left-1/2"
        />
        {processSteps.map((step) => (
          <li
            className="relative grid h-[94px] items-center lg:h-[116px] lg:grid-cols-[532px_48px_532px] lg:gap-6"
            key={step.id}
          >
            <article
              className={[
                "h-[94px] w-full rounded-xl border border-border bg-surface p-4 shadow-card lg:h-[116px] lg:w-[532px] lg:rounded-2xl lg:p-6",
                step.side === "left"
                  ? "lg:col-start-1"
                  : "lg:col-start-3 lg:row-start-1",
              ].join(" ")}
              data-ui="process-card"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-sm font-bold leading-7 lg:text-xl lg:leading-[34px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-6 text-muted lg:text-base lg:leading-[30px]">
                    {step.description}
                  </p>
                </div>
                <img alt="" className="mt-1 h-2 w-3" src={chevronIcon} />
              </div>
            </article>
            <span className="absolute -left-[52px] top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold leading-6 text-white lg:static lg:col-start-2 lg:row-start-1 lg:size-12 lg:translate-x-0 lg:text-base lg:leading-[30px]">
              {step.number}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
