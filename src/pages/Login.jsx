import { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from 'react-icons/fa';
import backgroundImage from '../assets/bg.jpg';
import axios from "axios";
import { useNavigate } from "react-router";


export default function Login({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setAuth(true);

      await fetch("/api/streak/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h1>Login</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Not Registered? <a href='./register'>Register Now</a> </p>
    </form>
  );
}