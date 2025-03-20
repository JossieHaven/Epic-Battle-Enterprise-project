import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./Signup.css";  

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  // Removed unused username state
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
        navigate("/");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setShowAlert(true);
    }
  };

  return (
    <div className="signup-box">
      <h2 className="signup-title">Create an Account</h2> 

      <Form className="signup-form" noValidate onSubmit={handleSubmit}>
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your signup!
          </Alert>
        )}

        <Form.Group className="form-group">
          <Form.Label className="form-label">Username</Form.Label>
          <div className="input-spacing">
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
              className="form-control"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="form-label">Email</Form.Label>
          <div className="input-spacing">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="form-control"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="form-label">Password</Form.Label>
          <div className="input-spacing">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="form-control"
            />
          </div>
        </Form.Group>

        <Button className="signup-btn" disabled={!(formData.username && formData.email && formData.password)} type="submit">
          SIGN UP
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
