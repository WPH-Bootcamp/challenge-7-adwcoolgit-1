import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  headingId?: string;
  level?: 2 | 3;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  headingId,
  level = 2,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div
      className={[
        "space-y-heading-gap",
        align === "center" ? "text-center" : "text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-align={align}
      data-ui="section-heading"
    >
      <Heading
        className="text-section-mobile font-bold text-ink lg:text-section-desktop"
        data-ui="section-heading-title"
        id={headingId}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p
          className="text-subtitle-mobile font-medium text-muted lg:text-subtitle-desktop"
          data-ui="section-heading-subtitle"
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
