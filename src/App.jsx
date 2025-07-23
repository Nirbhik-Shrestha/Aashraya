import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
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

function Navbar({ isAuthenticated }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/breathe">Breathe</Link>
      {isAuthenticated && <Link to="/forum">Forum</Link>}
      {isAuthenticated && <Link to="/streaks">Streaks</Link>}
      <Link to="/blogs">Blogs</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/crisis">Crisis</Link>
      {!isAuthenticated && <Link to="/login">Login</Link>}
      {!isAuthenticated && <Link to="/register">Register</Link>}
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/forum" element={isAuthenticated ? <Forum /> : <Navigate to="/login" />} />
        <Route path="/streaks" element={isAuthenticated ? <Streaks /> : <Navigate to="/login" />} />
        <Route path="/crisis" element={<Crisis />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </>
  );
}

export default App;