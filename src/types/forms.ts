export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  services: string[];
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<
  Record<ContactFormField, string>
>;

export type ContactFormStatus =
  | "idle"
  | "invalid"
  | "submitting"
  | "success";
