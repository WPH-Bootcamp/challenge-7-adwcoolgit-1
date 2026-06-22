import brandMark from "../../assets/icons/brand/logo-mark.svg";
import { companyIdentity } from "../../data/company";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
}

export function BrandLogo({
  className = "",
  compact = false,
}: BrandLogoProps) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center text-ink",
        compact ? "gap-1.5" : "gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        alt=""
        className={compact ? "h-6 w-auto" : "h-8 w-auto"}
        height="32"
        src={brandMark}
        width="30"
      />
      <span
        className={[
          "whitespace-nowrap font-logo font-semibold leading-none",
          compact ? "text-xs" : "text-base",
        ].join(" ")}
      >
        {companyIdentity.name}
      </span>
    </span>
  );
}
