import { useEffect, useRef, useState } from "react";
import menuIcon from "../../assets/icons/ui/menu.svg";
import {
  headerCallToAction,
  primaryNavigation,
} from "../../data/navigation";
import { handleSectionLink } from "../../lib";
import { Button } from "../ui";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button");
    focusable?.[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        triggerRef.current?.focus();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeAndNavigate: React.MouseEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    handleSectionLink(event);
    setIsOpen(false);
  };

  return (
    <div className="desktop:hidden">
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className={[
          "relative z-50 flex size-11 items-center justify-center rounded-sm transition-colors duration-200",
          "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isOpen ? "bg-surface text-primary" : "",
        ].join(" ")}
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        {isOpen ? (
          <span aria-hidden="true" className="text-[28px] font-medium leading-none">
            ×
          </span>
        ) : (
          <img alt="" className="size-6" src={menuIcon} />
        )}
      </button>
      {isOpen ? (
        <>
          <button
            aria-label="Dismiss navigation overlay"
            className="fixed inset-0 top-16 z-30 cursor-default bg-ink/10 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
            tabIndex={-1}
            type="button"
          />
          <nav
            aria-label="Mobile"
            className="fixed left-1/2 top-[72px] z-40 w-[calc(100%-32px)] max-w-[361px] -translate-x-1/2 rounded-2xl border border-border bg-canvas p-4 shadow-[0_20px_50px_rgb(10_13_18/18%)]"
            data-state="open"
            id="mobile-navigation-panel"
            ref={panelRef}
          >
            <ul className="space-y-1">
              {primaryNavigation.map((item) => (
                <li key={item.id}>
                  <a
                    className="flex h-11 items-center rounded-sm px-3 text-sm font-semibold leading-7 transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    href={item.href}
                    onClick={closeAndNavigate}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              className="mt-4"
              fullWidth
              href={headerCallToAction.href}
              onClick={closeAndNavigate}
              size="sm"
            >
              {headerCallToAction.label}
            </Button>
          </nav>
        </>
      ) : null}
    </div>
  );
}
