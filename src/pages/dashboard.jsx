import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Card, CardContent } from '../components/ui/card';

  

import MoodCard from '../components/MoodCard';

import JournalCard from '../components/JournalCard';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const moodsGraph = [
  'Angry', 'Sad', 'Neutral', 'Calm', 'Happy'
];

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [note, setNote] = useState('');

  const moodValues = {
    'Angry': 0,
    'Sad': 1,
    'Neutral': 2,
    'Calm': 3,
    'Happy': 4
  };

  const weekData = ['Angry', 'Neutral', 'Calm', 'Calm', 'Neutral', 'Happy', 'Calm'];

  const data = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
      {
        label: 'Mood Tracker',
        data: weekData.map(mood => moodValues[mood]),
        borderColor: '#4CAF50',
        backgroundColor: '#C8E6C9',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#4CAF50',
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 4,
        ticks: {
          callback: (value) => moodsGraph[value],
          stepSize: 1,
        },
        grid: {
          color: '#E0E0E0'
        }
      },
      x: {
        grid: {
          color: '#E0E0E0'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">ASHRAYA</h1>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-green-600">Overview</a>
            <a href="#" className="hover:text-green-600">Journal</a>
            <a href="#" className="hover:text-green-600">Breathing & Relaxation Tools</a>
            <a href="#" className="hover:text-green-600">Gratitude</a>
            <a href="#" className="hover:text-green-600">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-gray-200"></button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="p-6 space-y-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Good Morning, Hero <span className="inline-block">👋</span></h2>
          <p className="text-base text-gray-600">Check your upcoming deadlines and stay ahead of your schedule.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MoodCard selectedMood={selectedMood} setSelectedMood={setSelectedMood} note={note} setNote={setNote} />

            <Card>
              <CardContent className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Your Emotional Journey</h2>
                <p className="text-sm text-gray-500 mb-2">Track mood changes & reflect on your well-being.</p>
                <div className="h-64">
                  <Line data={data} options={options} />
                </div>
                <p className="text-sm mt-3 flex items-center gap-1 text-gray-600">
                  📝 Relaxed with friends and went on a nature walk.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Read the Most Read Journals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <JournalCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
