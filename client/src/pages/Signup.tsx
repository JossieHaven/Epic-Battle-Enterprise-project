import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // State to store user input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Mutation for signing up
  const [addUser, { error }] = useMutation(ADD_USER);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          input: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (data?.addUser?.token) {
        AuthService.login(data.addUser.token);
        navigate("/"); // Redirect after successful signup
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>Error signing up. Please try again.</p>}
    </main>
  );
};

export default Signup;
