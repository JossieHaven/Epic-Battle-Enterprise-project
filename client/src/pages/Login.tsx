import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email: formData.email, password: formData.password },
      });

      if (data?.login?.token) {
        AuthService.login(data.login.token);
        navigate("/"); // Redirect after successful login
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>

        <Form noValidate onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your login credentials!
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              value={formData.password}
              required
            />
            <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
          </Form.Group>

          <Button disabled={!(formData.email && formData.password)} type="submit">
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
