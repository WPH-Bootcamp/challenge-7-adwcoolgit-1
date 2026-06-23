import { useRef } from "react";
import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { serviceOptions } from "../../data/sections";
import { useContactForm } from "../../hooks";
import {
  Button,
  FormField,
  SectionHeading,
  SuccessDialog,
} from "../ui";

export function ContactSection() {
  const {
    values,
    errors,
    status,
    setField,
    toggleService,
    submit,
    reset,
  } = useContactForm();
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    reset();
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.getElementById("contact-name")?.focus(),
      ),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const result = await submit();
    if (!result.valid) {
      const firstField = ["name", "email", "message", "services"].find(
        (field) => field in result.errors,
      );
      const targetId =
        firstField === "services" ? "service-web" : `contact-${firstField}`;
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${targetId}`)?.focus(),
      );
    }
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className={[
        "mx-auto w-[calc(100%-32px)] max-w-[361px] scroll-mt-header-mobile px-0 pt-[74px]",
        "desktop:max-w-[720px] desktop:scroll-mt-header-desktop desktop:py-20",
        status === "invalid"
          ? "min-h-[1040px] desktop:min-h-[1050px]"
          : "h-[946px] desktop:h-[956px]",
      ].join(" ")}
      id={sectionIds.contact}
    >
      <SectionHeading
        className="!space-y-4"
        headingId="contact-heading"
        subtitle={sectionCopy.contact.subtitle}
        title={sectionCopy.contact.title}
      />
      {status === "success" ? (
        <div className="mt-10 desktop:mt-14">
          <SuccessDialog onReset={handleReset} />
        </div>
      ) : (
        <form
          aria-busy={status === "submitting"}
          className="mt-6 space-y-5 desktop:mt-12"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <FormField
            error={errors.name}
            id="contact-name"
            inputProps={{
              name: "name",
              onChange: (event) => setField("name", event.target.value),
              placeholder: "Enter your name",
              value: values.name,
            }}
            label="Name"
            required
          />
          <FormField
            error={errors.email}
            id="contact-email"
            inputProps={{
              name: "email",
              onChange: (event) => setField("email", event.target.value),
              placeholder: "Enter your email",
              type: "email",
              value: values.email,
            }}
            label="Email"
            required
          />
          <FormField
            error={errors.message}
            id="contact-message"
            kind="textarea"
            label="Message"
            required
            textareaProps={{
              name: "message",
              onChange: (event) => setField("message", event.target.value),
              placeholder: "Enter your message",
              rows: 5,
              value: values.message,
            }}
          />
          <fieldset
            aria-describedby={errors.services ? "services-error" : undefined}
            aria-invalid={errors.services ? true : undefined}
          >
            <legend className="text-sm font-semibold">Services</legend>
            <div className="mt-[21px] grid gap-y-3.5 desktop:mt-3 desktop:grid-cols-2 desktop:gap-x-12 desktop:gap-y-4">
              {serviceOptions.map((option) => (
                <FormField
                  id={`service-${option.id}`}
                  inputProps={{
                    checked: values.services.includes(option.value),
                    name: "services",
                    onChange: () => toggleService(option.value),
                    value: option.value,
                  }}
                  key={option.id}
                  kind="checkbox"
                  label={option.label}
                />
              ))}
            </div>
            {errors.services ? (
              <p
                className="mt-2 text-xs font-semibold text-primary"
                id="services-error"
              >
                {errors.services}
              </p>
            ) : null}
          </fieldset>
          <Button
            aria-busy={status === "submitting"}
            className="!mt-5 h-11 text-sm leading-7 desktop:!mt-10 desktop:h-12 desktop:text-base desktop:leading-[30px]"
            disabled={status === "submitting"}
            fullWidth
            size="sm"
            type="submit"
          >
            {status === "submitting" ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-4 animate-spin rounded-full border-2 border-white/45 border-t-white motion-reduce:animate-none"
                />
                Sending…
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      )}
    </section>
  );
}
