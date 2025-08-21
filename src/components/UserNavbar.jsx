import { Link } from "react-router-dom";
import { useState } from "react";
import "./UserNavbar.css";

export default function UserNavbar({ isAuthenticated, onLogout, streak }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false); // close menu on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Aashraya
        </Link>
      </div>

      {/* Hamburger toggle for small screens */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/breathe" onClick={() => setMenuOpen(false)}>Breathe</Link>
        {isAuthenticated && (
          <Link to="/forum" onClick={() => setMenuOpen(false)}>Forum</Link>
        )}
        <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        <Link to="/crisis" onClick={() => setMenuOpen(false)}>Crisis</Link>
        <Link to="/directory" onClick={() => setMenuOpen(false)}>Find a Center</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}

        {/* Mobile-only Auth Options */}
        {isAuthenticated && (
          <div className="mobile-auth">
            {streak !== null && (
              <span className="streak-display">🔥 {streak}-day streak</span>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <Link
              to="/profile"
              className="profile-icon"
              onClick={() => setMenuOpen(false)}
            >
              <img src={"../assets/cat.jpg"} alt="Profile" className="circle-pfp" />
            </Link>
          </div>
        )}
      </div>

      {/* Desktop-only Auth Options */}
      {isAuthenticated && (
        <div className="navbar-right">
          {streak !== null && (
            <span className="streak-display">🔥 {streak}-day streak</span>
          )}
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
          <Link to="/profile" className="profile-icon">
            <img src={"src/assets/cat.jpg"} alt="Profile" className="circle-pfp" />
          </Link>
        </div>
      )}
    </nav>
  );
}
