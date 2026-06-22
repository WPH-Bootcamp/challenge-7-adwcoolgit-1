import { sectionCopy } from "../../data/company";
import { sectionIds } from "../../data/navigation";
import { serviceOptions } from "../../data/sections";
import { Button, FormField, SectionHeading } from "../ui";

export function ContactSection() {
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
      <form className="mt-10 space-y-5 desktop:mt-14 desktop:space-y-6" noValidate>
        <FormField
          id="contact-name"
          inputProps={{ name: "name", placeholder: "Enter your name" }}
          label="Name"
          required
        />
        <FormField
          id="contact-email"
          inputProps={{
            name: "email",
            placeholder: "Enter your email",
            type: "email",
          }}
          label="Email"
          required
        />
        <FormField
          id="contact-message"
          kind="textarea"
          label="Message"
          required
          textareaProps={{
            name: "message",
            placeholder: "Enter your message",
            rows: 5,
          }}
        />
        <fieldset>
          <legend className="text-sm font-semibold">Services</legend>
          <div className="mt-3 grid gap-x-12 desktop:grid-cols-2">
            {serviceOptions.map((option, index) => (
              <FormField
                id={`service-${option.id}`}
                inputProps={{
                  defaultChecked: index === 0,
                  name: "services",
                  value: option.value,
                }}
                key={option.id}
                kind="checkbox"
                label={option.label}
              />
            ))}
          </div>
        </fieldset>
        <Button fullWidth size="sm" type="submit">
          Send
        </Button>
      </form>
    </section>
  );
}
