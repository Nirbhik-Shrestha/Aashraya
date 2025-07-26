import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register({ setAuth }) {
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      contact: form.contact.value,
      address: form.address.value,
      dob: form.dob.value
    };

    if (!validateEmail(userData.email)) {
      alert("Invalid email format");
      return;
    }

    if (!validatePhone(userData.contact)) {
      alert("Contact number must be 10 digits");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
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
    <form onSubmit={handleRegister} className="auth-form">
      <h1>Register</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="contact" placeholder="Contact Number" required />
      <input name="address" placeholder="Address" required />
      <input name="dob" type="date" required />
      <button type="submit">Register</button>
      <p>Have an account already? <a href='./login'>Login</a> </p>

    </form>
  );
}
