import consultationImage from "../../assets/images/consultation/free-consultation.png";
import { companyActions, sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { faqs } from "../../data/sections";
import { Button } from "../ui";
import { handleSectionLink } from "../../lib";
import { useState } from "react";

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string>(faqs[0].id);

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-40"
      id={sectionIds.faq}
    >
      <div className="grid gap-4 desktop:flex desktop:items-end desktop:justify-between desktop:gap-8">
        <h2
          className="max-w-96 text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl desktop:text-5xl"
          id="faq-heading"
        >
          {sectionCopy.faq.title}
        </h2>
        <p className="max-w-70 text-sm leading-6 text-muted desktop:max-w-52 desktop:pb-2 desktop:text-base desktop:leading-7">
          {sectionCopy.faq.subtitle}
        </p>
      </div>
      <div className="mt-8 h-px bg-border desktop:mt-12" />
      <div className="mt-8 grid gap-10 desktop:grid-cols-[1fr_330px] desktop:gap-16">
        <div>
          {faqs.map((faq) => {
            const isOpen = faq.id === openFaqId;
            return (
            <article
              className="border-b border-border py-5 first:pt-0"
              key={faq.id}
            >
              <h3>
                <button
                  aria-controls={`faq-panel-${faq.id}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 rounded-sm text-left text-sm font-bold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-lg"
                  onClick={() =>
                    setOpenFaqId((current) =>
                      current === faq.id ? "" : faq.id,
                    )
                  }
                  type="button"
                >
                  {faq.question}
                  <span className="text-2xl font-medium">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {isOpen ? (
                <p
                  className="mt-4 text-base leading-7 text-muted"
                  id={`faq-panel-${faq.id}`}
                >
                  {faq.answer}
                </p>
              ) : null}
            </article>
          )})}
        </div>
        <div className="rounded-xl bg-[#d94f30] p-6 text-white">
          <h3 className="text-3xl font-bold leading-tight">
            {sectionCopy.faq.consultationTitle}
          </h3>
          <p className="mt-2 text-sm leading-6">
            {sectionCopy.faq.consultationDescription}
          </p>
          <img
            alt="A team discussing a project around a conference table"
            className="mt-5 aspect-[1.65/1] w-full rounded-xl object-cover"
            height="655"
            loading="lazy"
            src={consultationImage}
            width="1200"
          />
          <Button
            className="mt-4"
            fullWidth
            href={companyActions.consultation.href}
            onClick={handleSectionLink}
            size="sm"
            variant="secondary"
          >
            {companyActions.consultation.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
