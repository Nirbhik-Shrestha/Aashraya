// Breathe.jsx
import { useEffect, useState } from "react";

export default function Breathe() {
  const [phase, setPhase] = useState("Inhale");
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      if (phase === "Inhale") {
        setPhase("Hold");
        setCount(4);
      } else if (phase === "Hold") {
        setPhase("Exhale");
        setCount(4);
      } else {
        setPhase("Inhale");
        setCount(4);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Breathe with Aashraya</h1>
      <p>Relax and follow the guided breathing below.</p>

      <div style={{ 
        margin: "2rem auto", 
        width: "200px", 
        height: "200px", 
        borderRadius: "50%", 
        backgroundColor: "#cce5ff", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: "1.5rem", 
        animation: `${phase === "Inhale" ? "expand" : phase === "Exhale" ? "shrink" : ""} 4s ease-in-out forwards` 
      }}>
        {phase}
      </div>

      <p>{phase === "Hold" ? "Hold your breath..." : `Now ${phase.toLowerCase()}...`}</p>

      <style>
        {`
          @keyframes expand {
            0% { transform: scale(1); }
            100% { transform: scale(1.3); }
          }
          @keyframes shrink {
            0% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
