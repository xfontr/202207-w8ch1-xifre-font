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

const loginState = {
  username: "",
  password: "",
  remember: false,
};

type IFormState = typeof initialFormState;
interface FieldProps {
  action: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value: Partial<IFormState>;
  label: string;
}

const PasswordInput = ({ action, value, label }: FieldProps): JSX.Element => (
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

const NameInput = ({ action, value, label }: FieldProps): JSX.Element => (
  <Form.Group className="mb-3" controlId="formBasicText">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type="text"
      placeholder="John"
      name={label === "Name" ? "name" : "username"}
      value={label === "Name" ? value.name : value.username}
      onChange={(event) => {
        action(event as React.ChangeEvent<HTMLInputElement>);
      }}
      required={true}
    />
  </Form.Group>
);

const SignForm = (): JSX.Element => {
  const [userData, setUserData] = useState(initialFormState);
  const [loginData, setLoginData] = useState(loginState);
  const [stage, setStage] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
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
          <NameInput action={handleChange} label={"Name"} value={userData} />

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
          <NameInput
            action={handleChange}
            label={"Username"}
            value={userData}
          />

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
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              loginData.password === userData.password &&
              loginData.username &&
              userData.username
            ) {
              setStage(3);
            }
          }}
        >
          <NameInput
            action={handleChangeLogin}
            label={"Username"}
            value={loginData}
          />

          <PasswordInput
            action={handleChangeLogin}
            value={loginData}
            label={"Password"}
          />

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={(e) => {
              setStage(1);
            }}
          >
            Back
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    default:
      return <>Hello</>;
  }
};

export default SignForm;
