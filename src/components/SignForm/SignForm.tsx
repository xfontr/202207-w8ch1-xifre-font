import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialFormState = {
  name: "",
  lastName: "",
  date: "",
  email: "",
  username: "",
  password: "",
  passwordRepeat: "",
};

interface PasswordProps {
  action: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value: string;
  label: string;
}

const PasswordInput = ({
  action,
  value,
  label,
}: PasswordProps): JSX.Element => (
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type="password"
      name={label === "Password" ? "password" : "passwordRepeat"}
      value={value}
      onChange={(event) => {
        action(event as React.ChangeEvent<HTMLInputElement>);
      }}
    />
  </Form.Group>
);

const SignForm = (): JSX.Element => {
  const [userData, setUserData] = useState(initialFormState);
  const [stage, setStage] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const getAge = (): number =>
    new Date().getFullYear() - +userData.date.slice(0, 4);

  switch (stage) {
    case 0:
      return (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              name="name"
              value={userData.name}
              onChange={(event) => {
                handleChange(event as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              name="lastName"
              value={userData.lastName}
              onChange={(event) => {
                handleChange(event as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDatePicker">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              name="date"
              value={userData.date}
              onChange={(event) => {
                handleChange(event as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            <Form.Text className="text-muted">
              {`You are ${getAge()} years old`}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={(event) => {
                handleChange(event as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={() => {
              setStage(1);
            }}
          >
            Next
          </Button>
        </Form>
      );
    case 1:
      return (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jonny"
              name="username"
              value={userData.username}
              onChange={(event) => {
                handleChange(event as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </Form.Group>

          <PasswordInput
            action={handleChange}
            value={userData.password}
            label={"Password"}
          />

          <PasswordInput
            action={handleChange}
            value={userData.passwordRepeat}
            label={"Repeat your password"}
          />

          <Button
            variant="primary"
            type="button"
            onClick={() => {
              setStage(0);
            }}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              setStage(2);
            }}
          >
            Next
          </Button>
        </Form>
      );
    default:
      return <>Hello</>;
  }
};

export default SignForm;
