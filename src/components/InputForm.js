import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import theme from "../theme";

function InputForm() {
  const [duration, setDuration] = useState(10);
  const [intensity, setIntensity] = useState("moderate");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const navigate = useNavigate();

  const muscleOptions = ["arms", "spine", "back", "hips", "legs", "core"];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setMuscleGroups((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/generate_plan/?duration=${duration}&intensity=${intensity}`,
        muscleGroups
      );
      const plan = response.data.plan || [];
      navigate("/plan", { state: { yogaPlan: plan } });
    } catch (error) {
      console.error("Error generating yoga plan:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.header,
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Input Your Details</h1>
      <div
        style={{
          background: theme.colors.background,
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <label style={{ display: "block", marginBottom: "10px", color:"rgb(106, 17, 203)" }}>
          Duration (minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              width: "96%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px", color:"rgb(106, 17, 203)" }}>
          Intensity:
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
        <div style={{ marginBottom: "10px" , color:"rgb(106, 17, 203)"}}>
          <label>Select Target Muscle Groups:</label>
          {muscleOptions.map((option) => (
            <label
              key={option}
              style={{
                display: "block",
                margin: "5px 0",
              }}
            >
              <input
                type="checkbox"
                value={option}
                onChange={handleCheckboxChange}
                style={{ marginRight: "5px" }}
              />
              {option}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            background: theme.colors.accent,
            color: theme.colors.textPrimary,
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Generate Plan
        </button>
      </div>
    </div>
  );
}

export default InputForm;
