// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    contact: "",
    address: "",
    dob: "",
  });
  const [moods, setMoods] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);
        setUserInfo({
          username: userData.username || "",
          email: userData.email || "",
          contact: userData.contact || "",
          address: userData.address || "",
          dob: userData.dob ? userData.dob.substring(0, 10) : "",
        });

        const moodRes = await fetch("/api/mood/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const moodData = await moodRes.json();

        setMoods(moodData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        const err = await res.json();
        alert("Failed to update profile: " + err.message);
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  if (loading) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-info">
        {isEditing ? (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={userInfo.contact}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
              />
            </label>
            <label>
              DOB:
              <input
                type="date"
                name="dob"
                value={userInfo.dob}
                onChange={handleChange}
              />
            </label>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Contact:</strong> {userInfo.contact}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
            <p><strong>Date of Birth:</strong> {userInfo.dob}</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <hr />

      <div className="mood-history">
        <h2>Mood History</h2>
        {moods.length === 0 ? (
          <p>No moods logged yet.</p>
        ) : (
          <ul>
            {moods.map((m, idx) => (
              <li key={idx}>
                <span>{new Date(m.timestamp).toLocaleDateString()}</span> — <strong>{m.mood}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
