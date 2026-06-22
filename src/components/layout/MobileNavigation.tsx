import menuIcon from "../../assets/icons/ui/menu.svg";
import { primaryNavigation } from "../../data/navigation";

export function MobileNavigation() {
  return (
    <div className="desktop:hidden">
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded="false"
        aria-label="Open navigation"
        className="flex size-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        type="button"
      >
        <img alt="" className="h-4 w-6" src={menuIcon} />
      </button>
      <div
        className="absolute inset-x-page top-16 z-30 hidden rounded-xl border border-border bg-canvas p-5 shadow-card"
        id="mobile-navigation-panel"
      >
        <ul className="space-y-1">
          {primaryNavigation.map((item) => (
            <li key={item.id}>
              <a
                className="flex min-h-11 items-center rounded-sm px-3 font-semibold"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
