// Home.jsx
import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(true);

  const moodOptions = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Okay", emoji: "😐" },
    { label: "Anxious", emoji: "😰" },
    { label: "Angry", emoji: "😠" }
  ];

  // Fetch today's mood on component mount
  useEffect(() => {
    const fetchTodayMood = async () => {
      try {
        const res = await axios.get("/api/mood/today", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data && res.data.mood) {
          setSelectedMood(res.data.mood);
        }
      } catch (err) {
        console.error("No mood logged today or error fetching it.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMood();
  }, []);

  const handleMoodSelect = async (mood) => {
    try {
      const res = await axios.post("/api/mood", { mood }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedMood(mood);
    } catch (err) {
      console.error("Error logging mood:", err);
      alert("You already logged your mood today.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Aashraya</h1>
        <p>Your space for mental well-being and support.</p>
      </header>

      <section className="mood-tracker-section">
        <h2>How are you feeling today?</h2>

        {selectedMood ? (
          <p className="mood-feedback">
            Thanks for sharing. You feel <strong>{selectedMood}</strong> today.
          </p>
        ) : (
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
