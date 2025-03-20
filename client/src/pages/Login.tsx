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
        navigate("/profile"); // Redirect to Profile after login
      }
    } catch (err) {
      console.error("Login Error:", err);
      setShowAlert(true); // Show error alert on failed login
    }
  };

  return (
    <div className="login-page"> 
      <div className="login-container"> 
        <h2 className="login-title">Login to Your Account</h2> 

        <Form noValidate onSubmit={handleFormSubmit} className="login-form">
          {showAlert && (
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
              Something went wrong with your login credentials!
            </Alert>
          )}

          <Form.Group className="form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <div className="input-spacing"> {/* Adds spacing between label and input */}
              <Form.Control
                type="text"
                placeholder="Enter your email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
                className="form-control"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-label">Password</Form.Label>
            <div className="input-spacing"> {/* Adds spacing between label and input */}
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required
                className="form-control"
              />
            </div>
          </Form.Group>

          <Button className="login-btn" disabled={!(formData.email && formData.password)} type="submit">
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
