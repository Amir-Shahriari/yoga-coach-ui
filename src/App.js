import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [duration, setDuration] = useState(10); // Default duration in minutes
  const [intensity, setIntensity] = useState("moderate");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [yogaPlan, setYogaPlan] = useState([]);

  const muscleOptions = ["arms", "spine", "back", "hips", "legs", "core"];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setMuscleGroups((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const generateYogaPlan = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/generate_plan/?duration=${duration}&intensity=${intensity}`,
        muscleGroups
      );
      setYogaPlan(response.data.plan || []);
    } catch (error) {
      console.error("Error generating yoga plan:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Yoga Coach</h1>
      </header>
      <main>
        <div className="form">
          <label>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <label>
            Intensity:
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
          <div className="checkbox-group">
            <label>Select Target Muscle Groups:</label>
            {muscleOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={generateYogaPlan}>Generate Yoga Plan</button>
        </div>
        <div className="results">
          <h2>Generated Yoga Plan</h2>
          <div className="yoga-plan">
            {yogaPlan.map((pose, index) => (
              <div className="pose-card" key={index}>
                <h3>{pose.pose}</h3>
                <p>
                  <strong>Description:</strong> {pose.description}
                </p>
                <p>
                  <strong>Duration:</strong> {pose.duration}
                </p>
                <p>
                  <strong>Instructions:</strong> {pose.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
