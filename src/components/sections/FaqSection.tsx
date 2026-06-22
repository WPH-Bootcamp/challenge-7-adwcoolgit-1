import consultationImage from "../../assets/images/consultation/free-consultation.png";
import { companyActions, sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { faqs } from "../../data/sections";
import { Button } from "../ui";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-40 desktop:px-0"
      id={sectionIds.faq}
    >
      <div className="flex items-end justify-between gap-8">
        <h2
          className="max-w-96 text-4xl font-bold leading-tight tracking-[-0.03em] desktop:text-5xl"
          id="faq-heading"
        >
          {sectionCopy.faq.title}
        </h2>
        <p className="max-w-52 pb-2 text-base leading-7 text-muted">
          {sectionCopy.faq.subtitle}
        </p>
      </div>
      <div className="mt-12 h-px bg-border" />
      <div className="mt-8 grid gap-16 desktop:grid-cols-[1fr_330px]">
        <div>
          {faqs.map((faq, index) => (
            <article
              className="border-b border-border py-5 first:pt-0"
              key={faq.id}
            >
              <div className="flex items-center justify-between gap-8">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <span className="text-2xl font-medium">
                  {index === 0 ? "−" : "+"}
                </span>
              </div>
              {index === 0 ? (
                <p className="mt-4 text-base leading-7 text-muted">
                  {faq.answer}
                </p>
              ) : null}
            </article>
          ))}
        </div>
        <aside className="rounded-xl bg-[#d94f30] p-6 text-white">
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
            size="sm"
            variant="secondary"
          >
            {companyActions.consultation.label}
          </Button>
        </aside>
      </div>
    </section>
  );
}
