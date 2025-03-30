import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/Api";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(API.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.success) {
        setMessage("Login successful!");
        onLogin(data.user); // Pass user data to parent

        // Redirect to appropriate dashboard based on role
        switch (data.user.role) {
          case "admin":
            navigate("/dashboard/admin");
            break;
          case "student":
            navigate("/dashboard/student");
            break;
          case "tutor":
            navigate("/dashboard/tutor");
            break;
          default:
            setMessage("Unknown role. Please contact support.");
        }
      } else {
        setMessage(
          data.message || "Login failed. Please check your email and password."
        );
      }
    } catch (error) {
      console.error("Error during login:", error); // Debugging
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default LoginForm;
