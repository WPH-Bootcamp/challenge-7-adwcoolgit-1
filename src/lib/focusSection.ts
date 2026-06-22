import type { MouseEvent } from "react";

export function focusSection(href: string) {
  if (!href.startsWith("#")) return false;
  const target = document.getElementById(href.slice(1));
  if (!target) return false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  target.addEventListener(
    "blur",
    () => target.removeAttribute("tabindex"),
    { once: true },
  );
  window.history.replaceState(null, "", href);
  return true;
}

export function handleSectionLink(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (href && focusSection(href)) event.preventDefault();
}
