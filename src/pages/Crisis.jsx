import "./Crisis.css";

export default function Crisis() {
  return (
    <div className="crisis-container">
      <h1>🆘 Crisis Mode</h1>
      <p>If you're in crisis, you're not alone. Take a deep breath.</p>

      <div className="crisis-actions">
        <button className="crisis-button emergency">📞 Call Emergency</button>
        <button className="crisis-button counselor">🧠 Connect to Counselor</button>
        <button className="crisis-button breathe">🌬️ Start Breathing Exercise</button>
      </div>

      <div className="crisis-resources">
        <h2>Helpful Resources</h2>
        <ul>
          <li><a href="https://www.nimh.nih.gov" target="_blank">National Institute of Mental Health</a></li>
          <li><a href="https://www.samaritans.org" target="_blank">Samaritans Support</a></li>
          <li><a href="https://www.who.int" target="_blank">WHO Mental Health</a></li>
        </ul>
      </div>
    </div>
  );
}
