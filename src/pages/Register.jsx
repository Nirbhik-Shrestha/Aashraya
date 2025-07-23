import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register({ setAuth }) {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}
