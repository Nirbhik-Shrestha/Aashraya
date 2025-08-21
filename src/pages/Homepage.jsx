import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Aashraya</h1>
        <p>Your safe space for mental health support, reflection, and growth.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn primary">Login</Link>
          <Link to="/register" className="btn secondary">Get Started</Link>
        </div>
      </header>

      {/* Features Section */}
      <main className="features">
        <h2>Why Aashraya?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span role="img" aria-label="breathing">🧘</span>
            <h3>Guided Breathing</h3>
            <p>Relax and refocus with calming breathing exercises.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="mood">📊</span>
            <h3>Mood Tracking</h3>
            <p>Track your daily mood and gain insights into your well-being.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="forum">💬</span>
            <h3>Supportive Forum</h3>
            <p>Share your thoughts and connect with others safely.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="blogs">📖</span>
            <h3>Blogs & Resources</h3>
            <p>Read curated articles and guides on mental health.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 Aashraya | Mental Health Matters
      </footer>
    </div>
  );
};

export default Homepage;
