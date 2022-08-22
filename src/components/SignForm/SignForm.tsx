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
  value: typeof initialFormState;
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
      value={label === "Password" ? value.password : value.passwordRepeat}
      onChange={(event) => {
        action(event as React.ChangeEvent<HTMLInputElement>);
        if (
          label !== "Password" &&
          value.password !== event.currentTarget.value
        ) {
          event.currentTarget.style.backgroundColor = "rgb(212, 76, 76)";
        } else {
          event.currentTarget.style.backgroundColor = "white";
        }
      }}
      required={true}
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setStage(1);
          }}
        >
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
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      );
    case 1:
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (userData.password === userData.passwordRepeat) {
              setStage(2);
            }
          }}
        >
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
            value={userData}
            label={"Password"}
          />

          <PasswordInput
            action={handleChange}
            value={userData}
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
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      );
    case 2:
      return <></>;
    default:
      return <>Hello</>;
  }
};

export default SignForm;
