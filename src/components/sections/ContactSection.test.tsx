import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("shows accessible errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(screen.getByLabelText(/Name/)).toHaveFocus());
    expect(screen.getByText("Please enter your name.")).toBeVisible();
    expect(screen.getByLabelText(/Name/)).toHaveAttribute("aria-invalid", "true");
  });

  it("submits locally, disables duplicates, and resets after success", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/Name/), "Ada Lovelace");
    await user.type(screen.getByLabelText(/Email/), "ada@example.com");
    await user.type(screen.getByLabelText(/Message/), "Build a product");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your message is ready",
    );
    expect(screen.getByRole("status")).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Send another message" }));
    expect(screen.getByLabelText(/Name/)).toHaveValue("");
  });
});
