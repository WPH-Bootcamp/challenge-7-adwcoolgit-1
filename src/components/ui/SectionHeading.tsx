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
        "space-y-3",
        align === "center" ? "text-center" : "text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Heading
        className="text-2xl font-bold tracking-[-0.02em] text-ink desktop:text-display-lg"
        id={headingId}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className="text-sm leading-7 text-muted desktop:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
