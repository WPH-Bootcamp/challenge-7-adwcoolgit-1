import { companyActions, companyIdentity, heroMedia } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { Button } from "../ui";
import { handleSectionLink } from "../../lib";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto h-[745px] max-w-none p-0 desktop:block desktop:h-[747px]"
      id={sectionIds.hero}
    >
      <div
        className="absolute left-4 top-[61px] z-10 w-[calc(100%-32px)] desktop:left-[calc(50%-580px)] desktop:top-[230px] desktop:w-[653px]"
        data-ui="hero-copy"
      >
        <h1
          className="max-w-none text-hero-mobile font-bold desktop:text-hero-desktop"
          id="hero-heading"
        >
          <span className="desktop:whitespace-nowrap">
            Your Tech Partner for
          </span>
          <span className="block text-primary">Smarter Growth</span>
        </h1>
        <p className="mt-2 max-w-none text-hero-body-mobile font-semibold text-ink desktop:text-hero-body-desktop">
          {companyIdentity.pageDescription}
        </p>
        <Button
          className="mt-10 w-full desktop:h-12 desktop:w-[200px] desktop:text-base desktop:leading-[30px]"
          href={companyActions.primary.href}
          onClick={handleSectionLink}
          size="sm"
        >
          {companyActions.primary.label}
        </Button>
      </div>

      <div
        className="absolute left-1/2 top-[344px] flex size-[391px] -translate-x-1/2 items-center justify-center desktop:left-[calc(50%-24px)] desktop:top-0 desktop:size-[747px] desktop:translate-x-0"
        data-ui="hero-image"
      >
        <div
          aria-hidden="true"
          className="absolute inset-8 hidden rounded-full bg-[radial-gradient(circle,rgba(255,98,62,0.12),rgba(255,255,255,0)_68%)] desktop:block"
        />
        <img
          alt={heroMedia.alt}
          className="relative z-10 size-[391px] object-contain [mask-image:radial-gradient(ellipse_70%_70%_at_center,black_52%,transparent_90%)] desktop:size-[747px] desktop:[mask-image:radial-gradient(ellipse_74%_74%_at_center,black_60%,transparent_100%)]"
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
