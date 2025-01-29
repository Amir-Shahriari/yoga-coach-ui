import React from "react";
import theme from "../theme";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `linear-gradient(to right, #6a11cb, #2575fc)`,
        color: "#ffffff",
        fontFamily: "'DynaPuff', cursive",
      }}
    >
      <h1>Welcome to Yoga Coach</h1>
      <p>Your personalized yoga journey begins here.</p>
      <button
        onClick={() => navigate("/input")}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#ff7300",
          color: "#ffffff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default WelcomePage;
