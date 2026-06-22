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

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden pb-28 desktop:pb-40"
      id={sectionIds.testimonials}
    >
      <div className="mx-auto max-w-300 px-page sm:px-8 desktop:px-0">
        <SectionHeading
          headingId="testimonials-heading"
          subtitle={sectionCopy.testimonials.subtitle}
          title={sectionCopy.testimonials.title}
        />
      </div>
      <div className="mx-auto mt-10 flex max-w-360 items-stretch justify-center gap-5 desktop:mt-14">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              aria-hidden={!isActive}
              className={[
                "relative min-h-76 shrink-0 rounded-xl border bg-surface px-5 pb-8 pt-13 text-center transition-[opacity,border-color] duration-200 motion-reduce:transition-none sm:px-8",
                isActive
                  ? "w-[calc(100vw-2.5rem)] max-w-150 border-primary/45 opacity-100"
                  : "hidden w-100 border-border opacity-20 desktop:block",
              ].join(" ")}
              key={testimonial.id}
            >
              <img
                alt=""
                className={[
                  "absolute -top-8 size-20",
                  isActive ? "left-8" : "right-8",
                ].join(" ")}
                src={quoteIcon}
              />
              <div
                aria-label="5 out of 5 stars"
                className="flex justify-center gap-1"
                role="img"
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <img alt="" className="size-5" key={starIndex} src={starIcon} />
                ))}
              </div>
              <blockquote className="mx-auto mt-5 max-w-130 text-sm font-semibold leading-6 sm:text-base sm:leading-7">
                “{testimonial.quote}”
              </blockquote>
              <p className="mt-6 font-bold">{testimonial.authorName}</p>
              <p className="mt-2 text-sm font-semibold text-primary">
                {[testimonial.authorRole, testimonial.company]
                  .filter(Boolean)
                  .join(" at ")}
              </p>
              {testimonial.avatar ? (
                <img
                  alt={testimonial.avatar.alt}
                  className="absolute -bottom-10 left-1/2 size-20 -translate-x-1/2 rounded-full object-cover"
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
      <div className="mt-16 flex items-center justify-center gap-4">
        <div
          aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
          className="flex justify-center gap-2"
        >
          {testimonials.map((testimonial, index) => (
            <button
              aria-label={`Show testimonial ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={[
                "size-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                index === activeIndex ? "bg-primary" : "bg-border",
              ].join(" ")}
              key={testimonial.id}
              onClick={() => selectIndex(index)}
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
