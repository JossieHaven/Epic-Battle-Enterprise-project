import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State to store user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Mutation for logging in
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>Invalid credentials. Please try again.</p>}
    </main>
  );
};

export default Login;
