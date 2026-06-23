import { useEffect, useRef, useState } from "react";
import menuIcon from "../../assets/icons/ui/menu.svg";
import { primaryNavigation } from "../../data/navigation";
import { handleSectionLink } from "../../lib";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="desktop:hidden">
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label="Open navigation"
        className="flex size-11 items-center justify-center rounded-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        <img alt="" className="size-6" src={menuIcon} />
      </button>
      {isOpen ? (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-page top-16 z-30 rounded-xl border border-border bg-canvas p-5 shadow-card"
          id="mobile-navigation-panel"
        >
          <ul className="space-y-1">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a
                  className="flex min-h-11 items-center rounded-sm px-3 font-semibold transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  href={item.href}
                  onClick={(event) => {
                    handleSectionLink(event);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
