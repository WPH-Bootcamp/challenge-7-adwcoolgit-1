import brandMark from "../../assets/icons/brand/logo-mark.svg";
import { companyIdentity } from "../../data/company";

interface BrandLogoProps {
  className?: string;
  size?: "responsive" | "mobile" | "desktop";
}

export function BrandLogo({
  className = "",
  size = "responsive",
}: BrandLogoProps) {
  const wrapperSize = {
    responsive: "h-8 w-[141px] desktop:h-9 desktop:w-[158.625px]",
    mobile: "h-8 w-[141px]",
    desktop: "h-9 w-[158.625px]",
  }[size];
  const markSize = {
    responsive: "h-8 w-[29.167px] desktop:h-9 desktop:w-[32.813px]",
    mobile: "h-8 w-[29.167px]",
    desktop: "h-9 w-[32.813px]",
  }[size];
  const textSize = {
    responsive: "text-logo-mobile desktop:text-logo-desktop",
    mobile: "text-logo-mobile",
    desktop: "text-logo-desktop",
  }[size];

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-1.5 text-ink desktop:gap-[7px]",
        wrapperSize,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-size={size}
      data-ui="brand-logo"
    >
      <img
        alt=""
        className={markSize}
        data-ui="brand-logo-mark"
        height="36"
        src={brandMark}
        width="33"
      />
      <span
        className={`whitespace-nowrap font-logo font-semibold ${textSize}`}
        data-ui="brand-logo-text"
      >
        {companyIdentity.name}
      </span>
    </span>
  );
}
