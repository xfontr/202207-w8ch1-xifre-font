import { render, screen } from "@testing-library/react";
import SignForm from "./SignForm";

describe("Given a SignForm component", () => {
  describe("When instantiated", () => {
    test("Then it should show 4 inputs and a 'Next' button", () => {
      render(<SignForm />);

      const form = [];
      form.push(screen.getByLabelText("Name"));
      form.push(screen.getByLabelText("Last name"));
      form.push(screen.getByLabelText("Birthdate"));
      form.push(screen.getByLabelText("Email address"));
      form.push(screen.getByRole("button", { name: "Next" }));

      form.forEach((field) => expect(field).toBeInTheDocument());
    });
  });
});
