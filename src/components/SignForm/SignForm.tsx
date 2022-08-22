import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignForm = (): JSX.Element => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="John" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Doe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDatePicker">
        <Form.Label>Select Date</Form.Label>
        <Form.Control type="date" placeholder="Date of Birth" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Button variant="primary" type="button">
        Next
      </Button>
    </Form>
  );
};

export default SignForm;
