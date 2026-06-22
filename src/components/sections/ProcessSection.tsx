import chevronIcon from "../../assets/icons/ui/chevron.svg";
import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { processSteps } from "../../data/sections";
import { SectionHeading } from "../ui";

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-40 desktop:px-0"
      id={sectionIds.process}
    >
      <SectionHeading
        headingId="process-heading"
        subtitle={sectionCopy.process.subtitle}
        title={sectionCopy.process.title}
      />
      <ol className="relative mt-16 space-y-4 desktop:space-y-0">
        <span
          aria-hidden="true"
          className="absolute bottom-12 left-1/2 top-12 hidden w-px -translate-x-1/2 bg-border desktop:block"
        />
        {processSteps.map((step) => (
          <li
            className="relative grid items-center desktop:min-h-34 desktop:grid-cols-[1fr_64px_1fr]"
            key={step.id}
          >
            <article
              className={[
                "rounded-xl border border-border bg-surface px-6 py-6 shadow-card",
                step.side === "left"
                  ? "desktop:col-start-1"
                  : "desktop:col-start-3",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
                <img alt="" className="mt-1 h-2 w-3" src={chevronIcon} />
              </div>
            </article>
            <span className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-white desktop:flex">
              {step.number}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
