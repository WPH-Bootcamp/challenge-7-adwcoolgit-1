import { companyActions, companyIdentity, heroMedia } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { Button } from "../ui";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-300 items-center gap-10 px-page pb-20 pt-10 sm:px-8 desktop:min-h-145 desktop:grid-cols-2 desktop:gap-5 desktop:px-0 desktop:pb-24 desktop:pt-10"
      id={sectionIds.hero}
    >
      <div className="relative z-10">
        <h1
          className="max-w-150 text-[2rem] font-bold leading-[1.18] tracking-[-0.035em] sm:text-4xl desktop:text-display-3xl"
          id="hero-heading"
        >
          <span className="desktop:whitespace-nowrap">
            Your Tech Partner for
          </span>
          <span className="block text-primary">Smarter Growth</span>
        </h1>
        <p className="mt-5 max-w-145 text-sm font-medium leading-7 text-ink sm:text-base desktop:text-lg">
          {companyIdentity.pageDescription}
        </p>
        <Button
          className="mt-8 w-full sm:w-auto sm:min-w-50 desktop:mt-10"
          href={companyActions.primary.href}
          size="sm"
        >
          {companyActions.primary.label}
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,98,62,0.12),rgba(255,255,255,0)_68%)]"
        />
        <img
          alt={heroMedia.alt}
          className="relative z-10 aspect-square w-full max-w-145 object-contain [mask-image:radial-gradient(ellipse_74%_74%_at_center,black_60%,transparent_100%)]"
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
