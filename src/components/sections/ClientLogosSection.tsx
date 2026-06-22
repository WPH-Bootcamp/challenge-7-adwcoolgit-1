import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { clientLogos } from "../../data/sections";

export function ClientLogosSection() {
  return (
    <section
      aria-labelledby="client-logos-heading"
      className="mx-auto max-w-300 scroll-mt-header-mobile px-page pb-24 sm:px-8 desktop:scroll-mt-header-desktop desktop:px-0 desktop:pb-30"
      id={sectionIds.clients}
    >
      <h2
        className="text-center text-sm font-bold sm:text-lg desktop:text-xl"
        id="client-logos-heading"
      >
        {sectionCopy.clients.title}
      </h2>
      <ul className="mt-10 grid grid-cols-3 items-center gap-5 desktop:mt-14 desktop:grid-cols-7 desktop:gap-9">
        {clientLogos.slice(0, 7).map((client, index) => (
          <li
            className={[
              "flex justify-center",
              index > 2 ? "hidden desktop:flex" : "",
            ].join(" ")}
            key={client.id}
          >
            <img
              alt={client.image.alt}
              className="h-7 max-w-full object-contain opacity-75 grayscale desktop:h-9 desktop:max-w-38"
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
