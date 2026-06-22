import { serviceOptions } from "../data/sections";
import type { ContactFormErrors, ContactFormValues } from "../types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validServices = new Set<string>(
  serviceOptions.map((option) => option.value),
);

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please enter a message.";
  if (values.services.length === 0) {
    errors.services = "Please select at least one service.";
  } else if (values.services.some((service) => !validServices.has(service))) {
    errors.services = "Please select a valid service.";
  }

  return errors;
}
