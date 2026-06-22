import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

interface FieldPresentationProps {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

type InputFieldProps = FieldPresentationProps & {
  kind?: "input";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "className" | "type"
  > & {
    type?: Exclude<InputHTMLAttributes<HTMLInputElement>["type"], "checkbox">;
  };
};

type TextareaFieldProps = FieldPresentationProps & {
  kind: "textarea";
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "id" | "className"
  >;
};

type CheckboxFieldProps = FieldPresentationProps & {
  kind: "checkbox";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "className" | "type"
  >;
};

export type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | CheckboxFieldProps;

const controlClasses =
  "w-full rounded-sm border border-border bg-canvas px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/75 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-70 aria-invalid:border-primary aria-invalid:ring-1 aria-invalid:ring-primary";

export function FormField(props: FormFieldProps) {
  const {
    id,
    label,
    description,
    error,
    required = false,
    className = "",
  } = props;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

  if (props.kind === "checkbox") {
    return (
      <div className={className}>
        <label
          className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-ink"
          htmlFor={id}
        >
          <input
            {...props.inputProps}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? true : undefined}
            className="size-4 rounded-sm border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            id={id}
            required={required}
            type="checkbox"
          />
          <span>{label}</span>
        </label>
        <FieldMessages
          description={description}
          descriptionId={descriptionId}
          error={error}
          errorId={errorId}
        />
      </div>
    );
  }

  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")}>
      <label className="block text-sm font-semibold text-ink" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {props.kind === "textarea" ? (
        <textarea
          {...props.textareaProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={`${controlClasses} min-h-32 resize-y`}
          id={id}
          required={required}
        />
      ) : (
        <input
          {...props.inputProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={controlClasses}
          id={id}
          required={required}
        />
      )}
      <FieldMessages
        description={description}
        descriptionId={descriptionId}
        error={error}
        errorId={errorId}
      />
    </div>
  );
}

interface FieldMessagesProps {
  description?: ReactNode;
  descriptionId?: string;
  error?: string;
  errorId?: string;
}

function FieldMessages({
  description,
  descriptionId,
  error,
  errorId,
}: FieldMessagesProps) {
  return (
    <>
      {description ? (
        <p className="text-xs leading-5 text-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs font-semibold leading-5 text-primary" id={errorId}>
          {error}
        </p>
      ) : null}
    </>
  );
}
