import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { clientLogos } from "../../data/sections";

export function ClientLogosSection() {
  return (
    <section
      aria-labelledby="client-logos-heading"
      className="relative mx-auto h-36 max-w-none scroll-mt-header-mobile overflow-hidden p-0 lg:h-[236px] lg:scroll-mt-header-desktop"
      id={sectionIds.clients}
    >
      <h2
        className="absolute top-10 h-[30px] w-full text-center text-base font-bold leading-[30px] lg:static lg:h-auto lg:text-2xl lg:leading-9"
        id="client-logos-heading"
      >
        {sectionCopy.clients.title}
      </h2>
      <ul className="absolute -left-[599px] top-[70px] flex items-center gap-12 py-10 lg:left-1/2 lg:top-[72px] lg:-translate-x-1/2">
        {clientLogos.map((client) => (
          <li className="flex shrink-0 justify-center" key={client.id}>
            <img
              alt={client.image.alt}
              className="h-[30px] max-w-none object-contain opacity-75 grayscale mix-blend-luminosity lg:h-12"
              height={client.image.height}
              loading="eager"
              src={client.image.src}
              width={client.image.width}
            />
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute bottom-0 left-0 top-[70px] w-12 bg-gradient-to-r from-canvas via-canvas/90 to-transparent lg:inset-y-0 lg:w-[260px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-[70px] w-12 bg-gradient-to-l from-canvas via-canvas/90 to-transparent lg:inset-y-0 lg:w-[260px]" />
    </section>
  );
}
