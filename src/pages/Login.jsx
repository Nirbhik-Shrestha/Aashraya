import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setAuth(true);

        // Fetch user details
        const userRes = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        const user = await userRes.json();
        localStorage.setItem("user", JSON.stringify(user));

        // Update streak for users only
        if (user.role === "user") {
          await fetch("/api/streak/update", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
        }

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/"); // or /home or wherever your user dashboard is
        }
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h1>Login</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Not Registered? <a href="./register">Register Now</a></p>
    </form>
  );
}
