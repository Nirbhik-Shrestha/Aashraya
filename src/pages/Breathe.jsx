import { useEffect, useState } from "react";

export default function Breathe() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const timer = setInterval(() => {
      if (phase === "Inhale") {
        setPhase("Hold");
      } else if (phase === "Hold") {
        setPhase("Exhale");
      } else {
        setPhase("Inhale");
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="breathe-container">
      <h1 className="breathe-title">Breathe with Aashraya</h1>
      <p className="breathe-description">Relax and follow the guided breathing below.</p>

      <div
        className={`breathe-circle ${phase.toLowerCase()}`}
      >
        {phase}
      </div>

      <p className="breathe-instruction">
        {phase === "Hold" ? "Hold your breath..." : `Now ${phase.toLowerCase()}...`}
      </p>

      <style>{`
        .breathe-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 90vh;
          background: linear-gradient(to bottom right, #dbeafe, #f0f9ff);
          font-family: 'Segoe UI', sans-serif;
        }

        .breathe-title {
          font-size: 2.5rem;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .breathe-description {
          font-size: 1.1rem;
          color: #3b82f6;
          margin-bottom: 5rem;
        }

        .breathe-circle {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #93c5fd, #3b82f6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: white;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
          animation-duration: 4s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
          margin-bottom: 3rem;
        }

        .inhale {
          animation-name: expand;
        }
        
        .hold {
          animation-name: hold;
        }

        .exhale {
          animation-name: shrink;
        }

        .breathe-instruction {
          margin-top: 1.5rem;
          font-size: 1.2rem;
          color: #1e40af;
        }

        @keyframes expand {
          0% { transform: scale(1); }
          100% { transform: scale(1.3); }
        }
        
        @keyframes hold {
          0% { transform: scale(1.3); }
          100% { transform: scale(1.3); }
        }

        @keyframes shrink {
          0% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
