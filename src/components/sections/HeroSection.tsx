import { companyActions, companyIdentity, heroMedia } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { Button } from "../ui";
import { handleSectionLink } from "../../lib";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto h-[745px] max-w-none p-0 lg:block lg:h-[640px] xl:h-[747px]"
      id={sectionIds.hero}
    >
      <div
        className="absolute left-4 top-[61px] z-10 w-[calc(100%-32px)] md:left-8 md:w-[min(560px,calc(100%-64px))] lg:left-8 lg:top-[176px] lg:w-[min(46vw,520px)] xl:left-[calc(50%-580px)] xl:top-[230px] xl:w-[653px]"
        data-ui="hero-copy"
      >
        <h1
          className="max-w-none text-hero-mobile font-bold lg:text-hero-desktop"
          id="hero-heading"
        >
          <span className="lg:whitespace-nowrap">
            Your Tech Partner for
          </span>
          <span className="block text-primary">Smarter Growth</span>
        </h1>
        <p className="mt-2 max-w-none text-hero-body-mobile font-semibold text-ink lg:text-hero-body-desktop">
          {companyIdentity.pageDescription}
        </p>
        <Button
          className="mt-10 w-full lg:h-12 lg:w-[200px] lg:text-base lg:leading-[30px]"
          href={companyActions.primary.href}
          onClick={handleSectionLink}
          size="sm"
        >
          {companyActions.primary.label}
        </Button>
      </div>

      <div
        className="absolute left-1/2 top-[344px] flex size-[391px] -translate-x-1/2 items-center justify-center lg:left-auto lg:right-0 lg:top-8 lg:size-[min(48vw,500px)] lg:translate-x-0 xl:left-[calc(50%-24px)] xl:right-auto xl:top-0 xl:size-[747px]"
        data-ui="hero-image"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-138px] top-[-28px] z-50 hidden h-[775.02px] w-[361.99px] bg-[linear-gradient(269.44deg,#FFFFFF_36.1%,rgba(255,255,255,0)_89.71%)] [transform:matrix(-1,0,0.01,1,0,0)] xl:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[120.15px] top-[458.16px] z-50 hidden h-[775.02px] w-[189.57px] bg-[linear-gradient(269.44deg,#FFFFFF_36.1%,rgba(255,255,255,0)_89.71%)] [transform:matrix(0,1,1,-0.01,1,0)] -translate-y-1/5 translate-x-4/5 xl:block"
        />
        <img
          alt={heroMedia.alt}
          className="relative z-10 size-full object-contain"
          decoding="sync"
          fetchPriority="high"
          height={heroMedia.height}
          loading="eager"
          src={heroMedia.src}
          width={heroMedia.width}
        />
      </div>
    </section>
  );
}