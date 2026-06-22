import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface SuccessDialogProps {
  onReset: () => void;
}

export function SuccessDialog({ onReset }: SuccessDialogProps) {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <div
      aria-live="polite"
      className="rounded-xl border border-primary/30 bg-surface px-6 py-12 text-center shadow-card"
      ref={statusRef}
      role="status"
      tabIndex={-1}
    >
      <p className="text-3xl font-bold text-ink">Your message is ready</p>
      <p className="mx-auto mt-3 max-w-120 text-sm leading-6 text-muted">
        Thanks for sharing your project. We’ll be in touch soon.
      </p>
      <Button className="mt-7" onClick={onReset} type="button">
        Send another message
      </Button>
    </div>
  );
}
