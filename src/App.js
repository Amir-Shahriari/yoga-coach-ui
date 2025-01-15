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
    <div className="App" style={{ background: "linear-gradient(to bottom right, #07506e, #61d0cf)", color: "#fff" }}>
      <header className="App-header"  style={{backgroundColor: "rgb(44 155 154 / 34%)"}}>
        <h1 style={{ fontFamily: "DynaPuff", margin: "20px" }}>Yoga Coach</h1>
      </header>
      <main>
        <div className="form" style={{ borderRadius: "20px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
          <label  style={{ color: "#4a4a4a" }}>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{
                margin: "10px 0",
                padding: "5px",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ color: "#4a4a4a", margin: "10px 20px" }}>
            Intensity:
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              style={{
                margin: "10px 0",
                padding: "5px 100px",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
          <div className="checkbox-group">
            <label style={{ color: "#4a4a4a" }}>Select Target Muscle Groups:</label>
            {muscleOptions.map((option) => (
              <label key={option} style={{ display: "block", margin: "5px 0", color: "#4a4a4a" }}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}
          </div>
          <button
            onClick={generateYogaPlan}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Generate Yoga Plan
          </button>
        </div>
        <div className="results" style={{ marginTop: "30px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "DynaPuff" , color: "rgb(160 27 177 / 45%)"}}>Generated Yoga Plan</h2>
          <div className="yoga-plan">
            {yogaPlan.map((pose, index) => (
              <div
                className="pose-card"
                key={index}
                style={{
                  margin: "10px auto",
                  padding: "20px",
                  borderRadius: "20px",
                  background: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  maxWidth: "500px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#ff7300bf" }}>{pose.pose}</h3>
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
