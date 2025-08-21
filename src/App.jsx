import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";
import "./App.css";
import UserManagement from "./pages/admin/UserManagement";
import ProfileDetail from "./pages/ProfileDetail";
import MentalHealthDirectory from "./pages/MentalHealthDirectory";


function ProtectedRoute({ isAuthenticated, allowedRoles = [], children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    setIsAuthenticated(!!token);

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }

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

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setStreak(null);
    setUser(null);
    // Navigate('/');
  };

  if (loading) return null;

  return (
    <>
      {isAuthenticated && user?.role === "user" && (
        <UserNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} streak={streak} />
      )}
      {isAuthenticated && user?.role === "admin" && (
        <AdminNavbar onLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />

        {/* User-only Routes */}
        <Route
  path="/"
  element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
        <Home />
            </ProtectedRoute>
  }
/>
        <Route
          path="/faq"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/breathe"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Breathe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/streaks"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Streaks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crisis"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Crisis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/directory"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <MentalHealthDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cardprofile/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <ProfileDetail  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
