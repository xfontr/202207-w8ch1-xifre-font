import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  describe("When the user types any value on all the fields", () => {
    test("Then every field will tdisplay the inputed value", () => {
      const input = "hello";
      render(<SignForm />);

      const name = screen.getByLabelText("Name") as HTMLInputElement;
      const lastName = screen.getByLabelText("Last name") as HTMLInputElement;
      const email = screen.getByLabelText("Email address") as HTMLInputElement;
      const birthday = screen.getByLabelText("Birthdate") as HTMLInputElement;

      fireEvent.change(name, { target: { value: input } });
      fireEvent.change(lastName, { target: { value: input } });
      fireEvent.change(email, { target: { value: input } });
      fireEvent.change(birthday, { target: { value: "1111-11-11" } });

      expect(name).toHaveValue(input);
      expect(lastName).toHaveValue(input);
      expect(email).toHaveValue(input);
      expect(birthday).toHaveValue("1111-11-11");
    });
  });

  describe("When the user types his age", () => {
    test("Then his age should be calculated and displayed", () => {
      const input = "1997-08-04";
      const expectedAge = new Date().getFullYear() - 1997;

      render(<SignForm />);

      const birthday = screen.getByLabelText("Birthdate") as HTMLInputElement;
      // const asdf = screen.getByRole("asdfasdfasdfasdfasfdasdfasd");

      fireEvent.change(birthday, { target: { value: input } });
      const age = screen.getByText(`You are ${expectedAge} years old`);

      expect(birthday).toHaveValue(input);
      expect(age).toBeInTheDocument();
    });
  });
});
