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
      className="mx-auto h-[1083.2125px] w-[calc(100%-32px)] max-w-[361px] md:max-w-[720px] scroll-mt-header-mobile px-0 pt-[72px] lg:h-[822px] lg:max-w-[1200px] xl:max-w-[1200px] lg:scroll-mt-header-desktop lg:py-20"
      id={sectionIds.faq}
    >
      <div className="relative top-0.5 grid h-[82px] gap-4 lg:static lg:flex lg:h-auto lg:items-end lg:justify-between lg:gap-8">
        <h2
          className="max-w-none text-[28px] font-bold leading-[38px] tracking-[-0.02em] lg:w-[331px] lg:text-[40px] lg:leading-14 lg:tracking-[-0.96px]"
          id="faq-heading"
        >
          {sectionCopy.faq.title}
        </h2>
        <p className="max-w-none text- lg:text-[18px] font-medium text-right leading-7 text-muted lg:w-[245px] lg:text-base lg:leading-8">
          {sectionCopy.faq.subtitle}
        </p>
      </div>
      <div className="mt-6 h-px bg-border lg:mt-12" />
      <div className="mt-6 grid gap-6 lg:mt-12 lg:grid-cols-[798px_329px] lg:gap-[73px]">
        <div className="h-[488px]" data-ui="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = faq.id === openFaqId;
            return (
            <article
              className={[
                "relative border-0 p-0",
                isOpen
                  ? "h-40 lg:h-[142px]"
                  : index === 1
                    ? "h-[120px] lg:h-[92px]"
                    : index < faqs.length - 1
                    ? "h-[88px] lg:h-[92px]"
                    : "h-8 lg:h-9",
              ].join(" ")}
              key={faq.id}
            >
              <h3>
                <button
                  aria-controls={`faq-panel-${faq.id}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 rounded-sm text-left text-base font-bold leading-[30px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:text-xl lg:leading-[34px]"
                  onClick={() =>
                    setOpenFaqId((current) =>
                      current === faq.id ? "" : faq.id,
                    )
                  }
                  type="button"
                >
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-medium transition-colors duration-200 motion-reduce:transition-none"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {isOpen ? (
                <p
                  className="mt-4 text-sm font-medium leading-7 text-muted lg:mt-[22px] lg:text-base lg:leading-[30px]"
                  id={`faq-panel-${faq.id}`}
                >
                  {faq.answer}
                </p>
              ) : null}
              {index < faqs.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-0 block h-px w-full bg-border",
                    isOpen
                      ? "top-[132px] lg:top-[114px]"
                      : index === 1
                        ? "top-[92px] lg:top-16"
                        : "top-[60px] lg:top-16",
                  ].join(" ")}
                />
              ) : null}
            </article>
          )})}
        </div>
        <div
          className="h-[361.2125px] rounded-xl bg-[#cc4e32] p-5 text-white lg:h-[453.379px] lg:w-[329px] lg:p-6"
          data-ui="consultation-card"
        >
          <h3 className="text-[28px] font-bold leading-[38px] lg:text-4xl lg:leading-[44px] lg:tracking-[-0.72px]">
            {sectionCopy.faq.consultationTitle}
          </h3>
          <p className="mt-2 text-sm font-medium leading-7">
            {sectionCopy.faq.consultationDescription}
          </p>
          <img
            alt="A team discussing a project around a conference table"
            className="mt-[13px] h-[175.2125px] w-full rounded-xl object-cover lg:mt-5 lg:h-[153.379px] lg:w-[281px]"
            height="655"
            loading="lazy"
            src={consultationImage}
            width="1200"
          />
          <Button
            className="mt-4 lg:mt-6 lg:h-12"
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
