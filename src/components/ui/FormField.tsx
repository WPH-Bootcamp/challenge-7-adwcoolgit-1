import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import checkIcon from "../../assets/icons/ui/check.svg";

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
  "block h-[46px] w-full rounded-sm border border-border bg-canvas px-4 text-sm leading-7 text-ink outline-none placeholder:text-muted/75 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-70 aria-invalid:border-primary aria-invalid:ring-1 aria-invalid:ring-primary";

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
      <div className={className} data-kind="checkbox" data-ui="form-field">
        <label
          className="inline-flex min-h-7 cursor-pointer items-center gap-3 text-sm font-medium leading-7 text-ink lg:min-h-[30px] lg:text-base lg:leading-[30px]"
          htmlFor={id}
        >
          <span className="relative size-5 shrink-0">
            <input
              {...props.inputProps}
              aria-describedby={describedBy || undefined}
              aria-invalid={error ? true : undefined}
              className="peer size-5 appearance-none rounded-sm border border-border bg-canvas checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              data-ui="form-checkbox"
              id={id}
              required={required}
              type="checkbox"
            />
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-[4px] size-3 opacity-0 peer-checked:opacity-100"
              src={checkIcon}
            />
          </span>
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
    <div
      className={["space-y-field-gap", className].filter(Boolean).join(" ")}
      data-kind={props.kind ?? "input"}
      data-ui="form-field"
    >
      <label
        className="block text-sm font-semibold leading-7 text-ink"
        data-ui="form-label"
        htmlFor={id}
      >
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {props.kind === "textarea" ? (
        <textarea
          {...props.textareaProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={`${controlClasses} h-33 min-h-33 resize-y`}
          data-ui="form-control"
          id={id}
          required={required}
        />
      ) : (
        <input
          {...props.inputProps}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={controlClasses}
          data-ui="form-control"
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
