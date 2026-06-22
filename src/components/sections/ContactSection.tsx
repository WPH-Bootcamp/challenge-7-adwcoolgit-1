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
      className="mx-auto max-w-190 scroll-mt-header-mobile px-page pb-28 sm:px-8 desktop:scroll-mt-header-desktop desktop:pb-40"
      id={sectionIds.contact}
    >
      <SectionHeading
        headingId="contact-heading"
        subtitle={sectionCopy.contact.subtitle}
        title={sectionCopy.contact.title}
      />
      {status === "success" ? (
        <div className="mt-10 desktop:mt-14">
          <SuccessDialog onReset={reset} />
        </div>
      ) : (
        <form
          className="mt-10 space-y-5 desktop:mt-14 desktop:space-y-6"
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
            <div className="mt-3 grid gap-x-12 desktop:grid-cols-2">
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
            disabled={status === "submitting"}
            fullWidth
            size="sm"
            type="submit"
          >
            {status === "submitting" ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
    </section>
  );
}
