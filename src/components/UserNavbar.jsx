// components/UserNavbar.jsx
import { Link } from "react-router-dom";

export default function UserNavbar({ isAuthenticated, onLogout, streak }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/breathe">Breathe</Link>
        {isAuthenticated && <Link to="/forum">Forum</Link>}
        {isAuthenticated && <Link to="/streaks">Streaks</Link>}
        <Link to="/blogs">Blogs</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/crisis">Crisis</Link>
        <Link to="/directory">Find a Center</Link>

        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/register">Register</Link>}
      </div>
      {isAuthenticated && (
        <div className="navbar-right">
          {streak !== null && (
            <span className="streak-display">🔥 {streak}-day streak</span>
          )}
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
          <Link to="/profile" className="profile-icon">
            <img src={"defaultPic.jpg"} alt="Profile" className="circle-pfp" />
          </Link>
        </div>
      )}
    </nav>
  );
}
