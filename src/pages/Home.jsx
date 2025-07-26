// Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLocked, setMoodLocked] = useState(false);

  const moodOptions = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Okay", emoji: "😐" },
    { label: "Anxious", emoji: "😰" },
    { label: "Angry", emoji: "😠" },
  ];

  useEffect(() => {
    const fetchTodayMood = async () => {
      try {
        const res = await axios.get("/api/mood/today", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.mood) {
          setSelectedMood(res.data.mood);
          setMoodLocked(true);
        }
      } catch (err) {
        console.error("Failed to check today's mood", err);
      }
    };

    fetchTodayMood();
  }, []);

  const handleMoodSelect = async (mood) => {
    try {
      await axios.post(
        "/api/mood",
        { mood },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedMood(mood);
      setMoodLocked(true);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
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
              disabled={moodLocked}
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
