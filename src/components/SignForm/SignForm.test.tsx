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

      fireEvent.change(birthday, { target: { value: input } });
      const age = screen.getByText(`You are ${expectedAge} years old`);

      expect(birthday).toHaveValue(input);
      expect(age).toBeInTheDocument();
    });
  });

  describe("When the user goes to the stage 2", () => {
    test("Then the stage 1 inputs should dissappear", async () => {
      render(<SignForm />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await userEvent.click(nextButton);

      const oldForm = [];
      oldForm.push(screen.queryByLabelText("Name"));
      oldForm.push(screen.queryByLabelText("Last name"));
      oldForm.push(screen.queryByLabelText("Birthdate"));
      oldForm.push(screen.queryByLabelText("Email address"));

      oldForm.forEach((field) => expect(field).not.toBeInTheDocument());
    });

    test("Then the stage 2 inputs should appear", () => {
      render(<SignForm />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      userEvent.click(nextButton);

      const form = [];
      form.push(screen.getByLabelText("Username"));
      form.push(screen.getByLabelText("Password"));
      form.push(screen.getByLabelText("Repeat your password"));
      form.push(screen.getByRole("button", { name: "Back" }));
      form.push(screen.getByRole("button", { name: "Next" }));

      form.forEach((field) => expect(field).toBeInTheDocument());
    });
  });

  describe("When the user types any value on the stage 2 fields", () => {
    test("Then every field will display the inputed value", () => {
      const input = "hello";
      render(<SignForm />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      userEvent.click(nextButton);

      const username = screen.getByLabelText("Username") as HTMLInputElement;
      const password = screen.getByLabelText("Password") as HTMLInputElement;
      const repeatPassword = screen.getByLabelText(
        "Repeat your password"
      ) as HTMLInputElement;

      fireEvent.change(username, { target: { value: input } });
      fireEvent.change(password, { target: { value: input } });
      fireEvent.change(repeatPassword, { target: { value: input } });

      expect(username).toHaveValue(input);
      expect(password).toHaveValue(input);
      expect(repeatPassword).toHaveValue(input);
    });
  });

  describe("When the user goes to the stage 3", () => {
    test("Then the stage 2 inputs should dissappear, except for the password and username", async () => {
      render(<SignForm />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await userEvent.click(nextButton);

      const secondNextButton = screen.getByRole("button", { name: "Next" });
      await userEvent.click(secondNextButton);

      const oldForm = [];
      oldForm.push(screen.queryByLabelText("Repeat your password"));

      oldForm.forEach((field) => expect(field).not.toBeInTheDocument());
    });

    test("Then the stage 3 inputs should appear", async () => {
      render(<SignForm />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await userEvent.click(nextButton);

      const secondNextButton = screen.getByRole("button", { name: "Next" });
      await userEvent.click(secondNextButton);

      const form = [];
      form.push(screen.getByLabelText("Username"));
      form.push(screen.getByLabelText("Password"));
      form.push(screen.getByRole("button", { name: "Back" }));
      form.push(screen.getByRole("button", { name: "Submit" }));

      form.forEach((field) => expect(field).toBeInTheDocument());
    });
  });
});
