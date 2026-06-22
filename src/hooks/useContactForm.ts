import { useState } from "react";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
} from "../types";
import { validateContactForm } from "../lib/validateContactForm";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  services: ["web-development"],
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const setField = <Field extends keyof ContactFormValues>(
    field: Field,
    value: ContactFormValues[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "invalid") setStatus("idle");
  };

  const toggleService = (service: string) => {
    setField(
      "services",
      values.services.includes(service)
        ? values.services.filter((item) => item !== service)
        : [...values.services, service],
    );
  };

  const submit = async () => {
    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("invalid");
      return { valid: false, errors: nextErrors };
    }

    setErrors({});
    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    setStatus("success");
    return { valid: true, errors: {} };
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  return {
    values,
    errors,
    status,
    setField,
    toggleService,
    submit,
    reset,
  };
}
