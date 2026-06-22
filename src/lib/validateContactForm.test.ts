import { describe, expect, it } from "vitest";
import { serviceOptions } from "../data/sections";
import { validateContactForm } from "./validateContactForm";

describe("validateContactForm", () => {
  it("requires trimmed name, email, and message values", () => {
    expect(
      validateContactForm({ name: " ", email: "", message: "\n", services: [] }),
    ).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email.",
      message: "Please enter a message.",
      services: "Please select at least one service.",
    });
  });

  it("rejects invalid email syntax", () => {
    expect(
      validateContactForm({
        name: "Ada",
        email: "ada@",
        message: "Build an app",
        services: ["web-development"],
      }).email,
    ).toBe("Please enter a valid email address.");
  });

  it("accepts only known service values", () => {
    const allowedServices = serviceOptions.map((option) => option.value);
    expect(
      validateContactForm({
        name: " Ada ",
        email: "ada@example.com",
        message: " Build an app ",
        services: [allowedServices[0]],
      }),
    ).toEqual({});
    expect(
      validateContactForm({
        name: "Ada",
        email: "ada@example.com",
        message: "Build an app",
        services: ["unknown"],
      }).services,
    ).toBe("Please select a valid service.");
  });
});
