import { useEffect, useRef } from "react";
import checkIcon from "../../assets/icons/ui/check.svg";
import { Button } from "./Button";

interface SuccessDialogProps {
  onReset: () => void;
}

export function SuccessDialog({ onReset }: SuccessDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const button = dialogRef.current?.querySelector<HTMLButtonElement>(
        "button",
      );
      if (!button) return;
      event.preventDefault();
      button.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/45 p-4 backdrop-blur-[2px]"
      data-ui="success-overlay"
    >
      <div
        aria-describedby="success-description"
        aria-labelledby="success-title"
        aria-modal="true"
        className="w-full max-w-[361px] rounded-2xl bg-canvas px-6 py-8 text-center shadow-[0_24px_80px_rgb(10_13_18/28%)] lg:max-w-[520px] lg:px-12 lg:py-12"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary shadow-[inset_0_1px_0_rgb(255_255_255/30%)]">
          <img alt="" className="size-9" src={checkIcon} />
        </div>
        <div aria-live="polite" role="status">
          <p
            className="mt-6 text-[28px] font-bold leading-[38px] tracking-[-0.02em] text-ink lg:text-4xl lg:leading-[44px]"
            id="success-title"
          >
            Your message is ready
          </p>
          <p
            className="mx-auto mt-3 max-w-[420px] text-sm font-medium leading-7 text-muted lg:text-base lg:leading-[30px]"
            id="success-description"
          >
            Thanks for sharing your project. We’ll be in touch soon.
          </p>
        </div>
        <Button
          className="mt-7"
          fullWidth
          onClick={onReset}
          type="button"
        >
          Send another message
        </Button>
      </div>
    </div>
  );
}
