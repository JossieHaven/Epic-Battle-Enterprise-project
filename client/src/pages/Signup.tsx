import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./Signup.css"; // ✅ Import the new CSS

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          userData: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (data?.addUser?.token) {
        AuthService.login(data.addUser.token);
        navigate("/"); // Redirect after signup
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>

        <Form noValidate onSubmit={handleSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your signup!
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
          </Form.Group>

          <Button disabled={!(formData.username && formData.email && formData.password)} type="submit">
            SIGN UP
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
