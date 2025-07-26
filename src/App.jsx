import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FAQ from "./pages/FAQ";
import Breathe from "./pages/Breathe";
import Forum from "./pages/Forum";
import Streaks from "./pages/Streaks";
import Crisis from "./pages/Crisis";
import Blogs from "./pages/Blogs";
import "./App.css";




function Navbar({ isAuthenticated, onLogout, streak }) {
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
        </div>
      )}
    </nav>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    
    if (token) {
      fetch("/api/streak", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(async (res) => {
    const text = await res.text();
    console.log("Raw streak response:", text);
    return JSON.parse(text);
  })
  .then((data) => {
    setStreak(data.streak);
  })
  .catch((err) => console.error("Failed to fetch streak:", err));

    }

    setLoading(false); // Mark done
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setStreak(null);

  };

  if (loading) return null; // Prevent premature redirect

  return (
    <>
      {isAuthenticated && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          streak={streak}
        />
      )}
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/breathe"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Breathe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/streaks"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Streaks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crisis"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Crisis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Blogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}


export default App;