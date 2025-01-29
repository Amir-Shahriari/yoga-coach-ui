import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../theme";

function GeneratedPlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const yogaPlan = location.state?.yogaPlan || [];
  

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
      }}
    >

      <h2
        style={{
          color: theme.colors.primary,
          fontFamily: theme.fonts.header,
        }}
      >
        Generated Yoga Plan
      </h2>
      <div>
        {yogaPlan.map((pose, index) => (
          <div
            key={index}
            style={{
              margin: "20px auto",
              padding: "20px",
              borderRadius: "20px",
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
              color: theme.colors.textPrimary,
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
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
            {/* Display image if available */}
            {pose.image && (
              <img
                src={pose.image}
                alt={pose.pose}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: theme.colors.accent,
          color: theme.colors.textPrimary,
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default GeneratedPlan;
