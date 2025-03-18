import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css"; // ✅ Import CSS for styling

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // GraphQL mutation
  const [loginUser] = useMutation(LOGIN_USER);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    try {
      const { data } = await loginUser({
        variables: { email: formData.email, password: formData.password },
      });

      if (data?.login?.token) {
        AuthService.login(data.login.token);
        navigate("/profile"); // ✅ Redirect to profile after login
      }
    } catch (err) {
      console.error("Login Error:", err);
      setShowAlert(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="login-form">
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Invalid email or password. Please try again.
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            value={formData.password}
            required
          />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button disabled={!(formData.email && formData.password)} type="submit" className="login-btn">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
