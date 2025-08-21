import { useEffect, useState } from "react";
import axios from "axios";
import MentalHealthCenterCard from "../components/MentalHealthCenterCard";
import "../components/card.css";

function MentalHealthDirectory() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState(""); // state for search query

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/centers")
      .then((res) => setCenters(res.data))
      .catch((err) => console.error("Error fetching centers:", err));
  }, []);

  // Filter centers by services
  const filteredCenters = centers.filter((center) =>
    center.services?.some((service) =>
      service.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="directory-container">
      <h1>Mental Health Services Directory</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by service (e.g., Counseling, Therapy)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="card-grid">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <MentalHealthCenterCard key={center._id} center={center} />
          ))
        ) : (
          <p className="no-results">No centers match your search.</p>
        )}
      </div>
    </div>
  );
}

export default MentalHealthDirectory;
