import { Card, CardContent } from './ui/card';


const moodOptions = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Calm', emoji: '😌' },
  { label: 'Neutral', emoji: '🙂' },
  { label: 'Angry', emoji: '😠' },
];

const MoodCard = ({ selectedMood, setSelectedMood, note, setNote }) => (
  <Card>
    <CardContent className="p-4 space-y-4">
      <h2 className="text-lg font-medium">How Are You Feeling Today?</h2>
      <p className="text-sm text-gray-500">Track your mood with emojis, add notes</p>
      <div className="flex gap-2">
        {moodOptions.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(label)}
            className={`p-4 border rounded-xl w-full flex flex-col items-center gap-1 ${
              selectedMood === label ? 'bg-yellow-100' : 'bg-white'
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <textarea
        placeholder="Write your note..."
        className="w-full p-2 border rounded-md text-sm"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </CardContent>
  </Card>
);

export default MoodCard;
