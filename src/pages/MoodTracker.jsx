export default function MoodTracker() {
  const [mood, setMood] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      const entry = { mood, date: new Date().toLocaleString() };
      setHistory([entry, ...history]);
      setMood("");
    }
  };

  return (
    <div>
      <h1>Mood Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling today?"
          required
        />
        <button type="submit">Log Mood</button>
      </form>
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.date}: {entry.mood}
          </li>
        ))}
      </ul>
    </div>
  );
}