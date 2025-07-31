import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== "admin") {
      navigate("/"); // prevent non-admins
    } else {
      setAdmin(user);
    }
  }, [navigate]);

  if (!admin) return <div className="admin-dashboard">Loading admin data...</div>;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Welcome, {admin.username}</h1>
        <p className="subtitle">Admin Dashboard</p>
      </header>

      <div className="admin-sections">
        <section className="admin-card">
          <h3>User Management</h3>
          <p>View, edit, or remove users.</p>
          <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        </section>

        <section className="admin-card">
          <h3>Mood Data</h3>
          <p>View user mood entries.</p>
          <button onClick={() => navigate("/admin/moods")}>View Moods</button>
        </section>

        <section className="admin-card">
          <h3>Analytics</h3>
          <p>Track usage and trends.</p>
          <button onClick={() => navigate("/admin/analytics")}>View Analytics</button>
        </section>
      </div>
    </div>
  );
}
