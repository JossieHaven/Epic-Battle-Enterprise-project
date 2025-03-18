import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./Signup.css"; // ✅ Import CSS for styling

const Signup = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Mutation for signing up
  const [addUser] = useMutation(ADD_USER);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

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
        navigate("/profile"); // ✅ Redirect to profile after signup
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setShowAlert(true);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="signup-form">
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong. Please check your details and try again.
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
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
          <Form.Label htmlFor="email">Email</Form.Label>
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
          <Form.Label htmlFor="password">Password</Form.Label>
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

        <Button
          disabled={!(formData.username && formData.email && formData.password)}
          type="submit"
          className="signup-btn"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
