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
      className="mx-auto h-[1083.2125px] w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[72px] desktop:h-[822px] desktop:max-w-[1200px] desktop:scroll-mt-header-desktop desktop:py-20"
      id={sectionIds.faq}
    >
      <div className="relative top-0.5 grid h-[82px] gap-4 desktop:static desktop:flex desktop:h-auto desktop:items-end desktop:justify-between desktop:gap-8">
        <h2
          className="max-w-none text-[28px] font-bold leading-[38px] tracking-[-0.02em] desktop:w-[331px] desktop:text-5xl desktop:leading-14 desktop:tracking-[-0.96px]"
          id="faq-heading"
        >
          {sectionCopy.faq.title}
        </h2>
        <p className="max-w-none text-sm font-medium leading-7 text-muted desktop:w-[245px] desktop:text-base desktop:leading-8">
          {sectionCopy.faq.subtitle}
        </p>
      </div>
      <div className="mt-6 h-px bg-border desktop:mt-12" />
      <div className="mt-6 grid gap-6 desktop:mt-12 desktop:grid-cols-[798px_329px] desktop:gap-[73px]">
        <div className="h-[488px]" data-ui="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = faq.id === openFaqId;
            return (
            <article
              className={[
                "relative border-0 p-0",
                index === 0
                  ? "h-40 desktop:h-[142px]"
                  : index === 1
                    ? "h-[120px] desktop:h-[92px]"
                    : index < faqs.length - 1
                    ? "h-[88px] desktop:h-[92px]"
                    : "h-8 desktop:h-9",
              ].join(" ")}
              key={faq.id}
            >
              <h3>
                <button
                  aria-controls={`faq-panel-${faq.id}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 rounded-sm text-left text-base font-bold leading-[30px] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary desktop:text-xl desktop:leading-[34px]"
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
                  className="mt-4 text-sm font-medium leading-7 text-muted desktop:mt-[22px] desktop:text-base desktop:leading-[30px]"
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
                    index === 0
                      ? "top-[132px] desktop:top-[114px]"
                      : index === 1
                        ? "top-[92px] desktop:top-16"
                        : "top-[60px] desktop:top-16",
                  ].join(" ")}
                />
              ) : null}
            </article>
          )})}
        </div>
        <div
          className="h-[361.2125px] rounded-xl bg-[#cc4e32] p-5 text-white desktop:h-[453.379px] desktop:w-[329px] desktop:p-6"
          data-ui="consultation-card"
        >
          <h3 className="text-[28px] font-bold leading-[38px] desktop:text-4xl desktop:leading-[44px] desktop:tracking-[-0.72px]">
            {sectionCopy.faq.consultationTitle}
          </h3>
          <p className="mt-2 text-sm font-medium leading-7">
            {sectionCopy.faq.consultationDescription}
          </p>
          <img
            alt="A team discussing a project around a conference table"
            className="mt-[13px] h-[175.2125px] w-full rounded-xl object-cover desktop:mt-5 desktop:h-[153.379px] desktop:w-[281px]"
            height="655"
            loading="lazy"
            src={consultationImage}
            width="1200"
          />
          <Button
            className="mt-4 desktop:mt-6 desktop:h-12"
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
