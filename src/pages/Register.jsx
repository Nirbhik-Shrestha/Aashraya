import { useNavigate } from "react-router";
import "./Login.jsx";

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
      dob: form.dob.value,
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
      body: JSON.stringify(userData),
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
    <div className="register-container">
      <div className="register-card">
        <h1 className="site-name">🌿 Aashraya</h1>
        <p className="tagline">Create your account and begin your journey</p>

        <form onSubmit={handleRegister} className="auth-form">
          <input name="username" placeholder="Username" required className="input-field" />
          <input name="password" type="password" placeholder="Password" required className="input-field" />
          <input name="email" type="email" placeholder="Email" required className="input-field" />
          <input name="contact" placeholder="Contact Number" required className="input-field" />
          <input name="address" placeholder="Address" required className="input-field" />
          <input name="dob" type="date" required className="input-field" />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
