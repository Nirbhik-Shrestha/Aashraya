import { useNavigate } from "react-router-dom";
import "./Login.css";

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

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
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
    <div className="login-container">
      <div className="login-card">
        <h1 className="site-name">🌿 Aashraya</h1>
        <p className="tagline">Your space for calm and connection</p>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            name="username"
            placeholder="Username"
            required
            className="input-field"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="register-link">
          Not Registered? <a href="/register">Register Now</a>
        </p>
      </div>
    </div>
  );
}
