import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileDetail.css";
import { Link } from "react-router-dom";

function ProfileDetail() {
  const { id } = useParams();
  const [center, setCenter] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/centers/${id}`)
      .then(res => setCenter(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!center) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>{center.name}</h1>
      <p><strong>Location:</strong> {center.location}</p>
      <p><strong>Services:</strong> {center.services.join(", ")}</p>
      <p><strong>Approaches:</strong> {center.approaches}</p>
      <p><strong>Languages:</strong> {center.languages.join(", ")}</p>
      <p><strong>Fees:</strong> {center.fees}</p>
      <p><strong>Internship:</strong> {center.internship ? "Available" : "Not Available"}</p>
      <p><strong>Operating Hours:</strong> {center.hours}</p>
      <p><strong>Contact:</strong> {center.contact}</p>
      <Link to="/directory" style={{ color: "#0077cc", textDecoration: "underline", display: "block", marginTop: "2rem", textAlign: "center" }}>
  ← Back to Directory
</Link>
    </div>
    
  );
  
}

export default ProfileDetail;
