import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State for user inputs
  const [duration, setDuration] = useState(20); // Default: 20 minutes
  const [intensity, setIntensity] = useState("moderate"); // Default: moderate
  const [muscleGroups, setMuscleGroups] = useState([]); // List of selected muscles
  const [plan, setPlan] = useState(null); // Stores the generated plan

  // List of available muscle groups
  const muscleOptions = ["core", "legs", "arms", "spine", "back", "hips"];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/generate_plan/`,
        muscleGroups,
        {
          params: { duration, intensity },
        }
      );
      setPlan(response.data.plan); // Update state with the plan
    } catch (error) {
      console.error("Error generating yoga plan:", error);
      setPlan(null);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Yoga Coach</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          {/* Duration Input */}
          <label>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              min="5"
            />
          </label>

          {/* Intensity Dropdown */}
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

          {/* Muscle Groups Checkboxes */}
          <fieldset>
            <legend>Select Target Muscle Groups:</legend>
            {muscleOptions.map((muscle) => (
              <label key={muscle}>
                <input
                  type="checkbox"
                  value={muscle}
                  checked={muscleGroups.includes(muscle)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMuscleGroups([...muscleGroups, muscle]);
                    } else {
                      setMuscleGroups(
                        muscleGroups.filter((group) => group !== muscle)
                      );
                    }
                  }}
                />
                {muscle}
              </label>
            ))}
          </fieldset>

          <button type="submit">Generate Yoga Plan</button>
        </form>

        {/* Display the Generated Plan */}
        {plan && (
          <section>
            <h2>Generated Yoga Plan</h2>
            <ul>
              {plan.map((pose, index) => (
                <li key={index}>
                  <h3>{pose.pose}</h3>
                  <p>{pose.description}</p>
                  <p>Duration: {pose.duration}</p>
                  <p>Instructions: {pose.instructions}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
