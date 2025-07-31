import { Link } from "react-router-dom";
import "./card.css";

function MentalHealthCenterCard({ center }) {
  return (
    <div className="card">
      <h3>{center.name}</h3>
      <p>{center.location}</p>
      <p>Services: {center.services.join(", ")}</p>
      <Link to={`/cardprofile/${center._id}`}>View Details</Link>
    </div>
  );
}

export default MentalHealthCenterCard;
