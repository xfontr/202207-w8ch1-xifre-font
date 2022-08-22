import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialFormState = {
  name: "",
  lastName: "",
  date: "",
  email: "",
};

const SignForm = (): JSX.Element => {
  const [userData, setUserData] = useState(initialFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const getAge = (): number =>
    new Date().getFullYear() - +userData.date.slice(0, 4);

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

      <Button variant="primary" type="button">
        Next
      </Button>
    </Form>
  );
};

export default SignForm;
