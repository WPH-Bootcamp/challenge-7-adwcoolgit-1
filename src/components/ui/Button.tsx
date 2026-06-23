import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

type ButtonElementProps = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type LinkElementProps = ButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonElementProps | LinkElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-pressed active:bg-primary-pressed",
  secondary: "bg-ink text-white hover:bg-ink/85 active:bg-black",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary/8 active:bg-primary/15",
  ghost: "bg-transparent text-ink hover:bg-surface active:bg-border-subtle/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-6 text-button",
  md: "h-12 px-8 text-button",
  lg: "h-12 px-8 text-body-md",
};

const getClasses = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonStyleProps) =>
  [
    "inline-flex items-center justify-center gap-2 rounded-pill font-semibold inset-shadow-button",
    "transition-colors duration-200 motion-reduce:transition-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

export function Button(props: ButtonProps) {
  if ("href" in props && props.href !== undefined) {
    const {
      children,
      className,
      fullWidth,
      size,
      variant,
      ...anchorProps
    } = props;

    return (
      <a
        className={getClasses({
          children,
          className,
          fullWidth,
          size,
          variant,
        })}
        data-ui="button"
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    className,
    fullWidth,
    size,
    type = "button",
    variant,
    ...buttonProps
  } = props;

  return (
    <button
      className={getClasses({
        children,
        className,
        fullWidth,
        size,
        variant,
      })}
      data-ui="button"
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
