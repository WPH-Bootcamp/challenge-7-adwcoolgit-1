import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { clientLogos } from "../../data/sections";

export function ClientLogosSection() {
  return (
    <section
      aria-labelledby="client-logos-heading"
      className="mx-auto max-w-300 scroll-mt-header-desktop px-page pb-30 desktop:px-0"
      id={sectionIds.clients}
    >
      <h2
        className="text-center text-lg font-bold desktop:text-xl"
        id="client-logos-heading"
      >
        {sectionCopy.clients.title}
      </h2>
      <ul className="mt-14 flex items-center justify-between gap-9 overflow-hidden">
        {clientLogos.slice(0, 7).map((client) => (
          <li className="shrink-0" key={client.id}>
            <img
              alt={client.image.alt}
              className="h-9 max-w-38 object-contain opacity-75 grayscale"
              height={client.image.height}
              loading="eager"
              src={client.image.src}
              width={client.image.width}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
