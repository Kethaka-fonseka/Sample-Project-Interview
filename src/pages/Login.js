import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

//This is Login page component
export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Login function 
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const data = {
        username: username,
        password: password,
      };
      axios
        .post("http://localhost:8070/users/login", data)
        .then((res) => {
          const status = res.data;
          if (status == "Unauthorized") {
            alert("username and password mismatched!!!");
          }
          window.localStorage.setItem("username",status);
          alert(`Welcome ${status}`);
          window.location.href="/home";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  //set password when user input the values
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  //set username when user input the values
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="registration-form">
        <h2 className="mb-3">Sign In</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleLogin}
          className="justify-content"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                pattern="[A-Za-z]{3,}"
                onChange={onChangeUsername}
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter correct username.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationPassword">
              <Form.Label className="text-left">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={onChangePassword}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Password must contain : A lowercase letter,A captial letter , A
                number, Minimun 8 charaters
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-grid">
            <Button variant="secondary" type="submit">
              Sign In
            </Button>
          </div>
        </Form>
        <div className="mt-3">
          <p className="mb-0">
            Dosent Have a Account??{"  "}
            <a href="/signup" className="text-secondary fw-bold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
