import { useState } from "react";
import quoteIcon from "../../assets/icons/ui/quote-filled.svg";
import starIcon from "../../assets/icons/ui/star-filled.svg";
import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { testimonials } from "../../data/sections";
import { SectionHeading } from "../ui";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeTestimonial = testimonials[activeIndex];

  const selectIndex = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + testimonials.length) % testimonials.length;
    selectIndex(nextIndex);
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>(
          `[data-testimonial-control="${nextIndex}"]`,
        )
        ?.focus(),
    );
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="h-[583px] overflow-hidden pt-[75px] desktop:h-[723px] desktop:py-20"
      id={sectionIds.testimonials}
    >
      <div className="mx-auto max-w-[393px] px-4 desktop:max-w-300 desktop:px-0">
        <SectionHeading
          headingId="testimonials-heading"
          subtitle={sectionCopy.testimonials.subtitle}
          title={sectionCopy.testimonials.title}
        />
      </div>
      <div className="mx-auto mt-12 flex max-w-none items-stretch justify-center gap-5 desktop:mt-20">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              aria-hidden={!isActive}
              className={[
                "relative h-[284px] min-h-0 shrink-0 rounded-2xl border bg-surface px-5 pb-10 pt-[18px] text-center transition-[opacity,border-color] duration-200 motion-reduce:transition-none desktop:h-[292px] desktop:w-[594px] desktop:px-6 desktop:pb-12 desktop:pt-6",
                isActive
                  ? "w-[calc(100vw-32px)] max-w-[361px] border-border opacity-100 desktop:max-w-none desktop:border-primary/45"
                  : "hidden w-100 border-border opacity-20 desktop:block desktop:w-[594px]",
              ].join(" ")}
              data-ui="testimonial-card"
              key={testimonial.id}
            >
              <img
                alt=""
                className={[
                  "absolute -top-10 size-16 desktop:-top-[42px] desktop:size-20",
                  isActive ? "left-[19px] desktop:left-[51px]" : "right-6 desktop:right-[51px]",
                ].join(" ")}
                src={quoteIcon}
              />
              <div
                aria-label="5 out of 5 stars"
                className="flex justify-center gap-1"
                role="img"
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <img alt="" className="size-5 desktop:size-6" key={starIndex} src={starIcon} />
                ))}
              </div>
              <blockquote className="mx-auto mt-3 max-w-none text-sm font-semibold leading-7 desktop:text-lg desktop:leading-8">
                “{testimonial.quote}”
              </blockquote>
              <p className="mt-4 font-bold leading-7 desktop:mt-6 desktop:text-lg desktop:font-semibold desktop:leading-8">
                {testimonial.authorName}
              </p>
              <p className="mt-1 text-sm font-semibold leading-7 text-primary desktop:mt-0 desktop:text-lg desktop:leading-8">
                {[testimonial.authorRole, testimonial.company]
                  .filter(Boolean)
                  .join(" at ")}
              </p>
              {testimonial.avatar ? (
                <img
                  alt={testimonial.avatar.alt}
                  className="absolute -bottom-[21px] left-1/2 size-[60px] -translate-x-1/2 rounded-full object-cover desktop:-bottom-11 desktop:size-[75px]"
                  height={testimonial.avatar.height}
                  loading="lazy"
                  src={testimonial.avatar.src}
                  width={testimonial.avatar.width}
                />
              ) : null}
            </article>
          );
        })}
      </div>
      <div className="mt-12 flex items-center justify-center gap-4 desktop:mt-20">
        <div
          aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
          className="flex justify-center gap-2"
        >
          {testimonials.map((testimonial, index) => (
            <button
              aria-label={`Show testimonial ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={[
                "size-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 desktop:size-3",
                index === activeIndex ? "bg-primary" : "bg-border",
              ].join(" ")}
              key={testimonial.id}
              onClick={() => selectIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  selectAndFocus(index - 1);
                }
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  selectAndFocus(index + 1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  selectAndFocus(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  selectAndFocus(testimonials.length - 1);
                }
              }}
              data-testimonial-control={index}
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
            />
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing testimonial from {activeTestimonial.authorName}
      </p>
    </section>
  );
}
