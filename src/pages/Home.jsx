// Home.jsx
import { useState } from "react";
import "./Home.css";

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moodOptions = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Okay", emoji: "😐" },
    { label: "Anxious", emoji: "😰" },
    { label: "Angry", emoji: "😠" }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    alert(`You selected: ${mood}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Aashraya</h1>
        <p>Your space for mental well-being and support.</p>
      </header>

      <section className="mood-tracker-section">
        <h2>How are you feeling today?</h2>
        <div className="mood-options">
          {moodOptions.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood.label)}
              className="mood-button"
            >
              <span className="emoji">{mood.emoji}</span>
              <span className="label">{mood.label}</span>
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="mood-feedback">
            Thanks for sharing. You feel <strong>{selectedMood}</strong> today.
          </p>
        )}
      </section>

      <section className="home-links">
        <ul>
          <li><a href="/breathe">🧘 Breathe & Relax</a></li>
          <li><a href="/forum">💬 Join the Discussion Forum</a></li>
          <li><a href="/streaks">🔥 View Your Streaks</a></li>
          <li><a href="/blogs">📖 Read Mental Health Blogs</a></li>
          <li><a href="/faq">❓ FAQs</a></li>
          <li><a href="/crisis">🚨 Crisis Mode</a></li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
