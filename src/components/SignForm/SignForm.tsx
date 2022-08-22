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
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="John"
          id="name"
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
          id="lastName"
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
          id="date"
          value={userData.date}
          onChange={(event) => {
            handleChange(event as React.ChangeEvent<HTMLInputElement>);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          id="email"
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
