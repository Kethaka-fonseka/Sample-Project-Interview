import React, {  useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./Register.css";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

//This is Registration page component
export default function Register() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);


  //Method to submit the form details 
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      const user = {
        "firstname": firstName,
        "lastname": lastName,
        "username": userName,
        "password": password,
      };
      axios
        .post("http://localhost:8070/users", user)
        .then((res) => {
            setShow(true);
        
     window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Set firstname when user type 
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

 //Set Lastname when user type 
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  //Set Username when user type 
  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  //Set password when user type 
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Set confirm password when user type 
  const onConfrimPwdChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="registration-form">
        <h2 className="mb-3">Sign Up</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="justify-content"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={onFirstNameChange}
                placeholder="First name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={onLastNameChange}
                placeholder="Last name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  onChange={onUserNameChange}
                  pattern='[A-Za-z]{3,}'
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationPassword">
              <Form.Label className="text-left">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={onPasswordChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Password must contain : A lowercase letter,A captial letter , A
                number, Minimun 8 charaters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
              <Form.Label className="text-left">Confrim Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confrim Password"
                onChange={onConfrimPwdChange}
                name="cpassword"
                isInvalid={password != confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password Dosent Match
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="secondary" type="submit">
              Create Account
            </Button>
          </div>
        </Form>
        <div className="mt-3">
          <p className="mb-0">
            Already have an account??{" "}
            <a href="/" className="text-secondary fw-bold">
              Sign In
            </a>
          </p>
        </div>
        <Alert variant="dark"  show={show}>
        User Registration Successful!!!
        </Alert>
      </div>
    </div>
  );
}
