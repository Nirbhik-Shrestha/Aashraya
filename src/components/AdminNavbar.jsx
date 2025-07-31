// components/AdminNavbar.jsx
import { Link } from "react-router-dom";

export default function AdminNavbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        {/* Add more admin links here when you build them */}
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
