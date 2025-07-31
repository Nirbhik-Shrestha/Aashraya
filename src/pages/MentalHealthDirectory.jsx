import { useEffect, useState } from "react";
import axios from "axios";
import MentalHealthCenterCard from "../components/MentalHealthCenterCard";
import "../components/card.css"

function MentalHealthDirectory() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/centers")
      .then(res => setCenters(res.data))
      .catch(err => console.error("Error fetching centers:", err));
  }, []);

  return (
    <div className="directory-container">
      <h1>Mental Health Services Directory</h1>
      <div className="card-grid">
        {centers.map(center => (
          <MentalHealthCenterCard key={center._id} center={center} />
        ))}
      </div>
    </div>
  );
}

export default MentalHealthDirectory;
