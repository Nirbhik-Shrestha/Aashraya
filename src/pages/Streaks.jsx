// src/pages/Streaks.jsx
import React, { useEffect, useState } from "react";

function Streaks() {
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    fetch("/api/streak", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch streak");
        }
        return res.json();
      })
      .then((data) => {
        setStreak(data.streak);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading streak...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="streak-page">
      <h2>Your Current Streak</h2>
      <div className="streak-counter">🔥 {streak}-day streak</div>
      <p>Come back every day to continue your progress!</p>
    </div>
  );
}

export default Streaks;
