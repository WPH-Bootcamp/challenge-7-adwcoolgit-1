import chevronIcon from "../../assets/icons/ui/chevron.svg";
import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { processSteps } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="mx-auto h-[853px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[76px] desktop:h-[1099px] desktop:max-w-290 desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.process}
    >
      <SectionHeading
        headingId="process-heading"
        subtitle={sectionCopy.process.subtitle}
        title={sectionCopy.process.title}
      />
      <ol className="relative mt-[22px] space-y-4 pl-[52px] desktop:mt-16 desktop:grid desktop:grid-rows-6 desktop:gap-4 desktop:space-y-0 desktop:pl-0">
        <span
          aria-hidden="true"
          className="absolute bottom-[58px] left-5 top-[58px] block w-px -translate-x-1/2 bg-border desktop:left-1/2"
        />
        {processSteps.map((step) => (
          <li
            className="relative grid h-[94px] items-center desktop:h-[116px] desktop:grid-cols-[532px_48px_532px] desktop:gap-6"
            key={step.id}
          >
            <article
              className={[
                "h-[94px] w-full rounded-xl border border-border bg-surface p-4 shadow-card desktop:h-[116px] desktop:w-[532px] desktop:rounded-2xl desktop:p-6",
                step.side === "left"
                  ? "desktop:col-start-1"
                  : "desktop:col-start-3 desktop:row-start-1",
              ].join(" ")}
              data-ui="process-card"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-sm font-bold leading-7 desktop:text-xl desktop:leading-[34px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-6 text-muted desktop:text-base desktop:leading-[30px]">
                    {step.description}
                  </p>
                </div>
                <img alt="" className="mt-1 h-2 w-3" src={chevronIcon} />
              </div>
            </article>
            <span className="absolute -left-[52px] top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold leading-6 text-white desktop:static desktop:col-start-2 desktop:row-start-1 desktop:size-12 desktop:translate-x-0 desktop:text-base desktop:leading-[30px]">
              {step.number}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
