import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

function ProgressBar() {
  const { data } = useSelector((state: any) => state.factcheck);

  // Extract the numeric value and remove the "%" symbol, then round up to the nearest integer
  const confidencePercent = Math.ceil(parseFloat(data.confidence.level));

  // Define a function to determine the stroke color based on the percentage
  const getStrokeColor = (percentage) => {
    if (percentage >= 75) {
      return "#22C55E"; // Green for percentages >= 75
    } else if (percentage >= 50) {
      return "#FFA500"; // Orange for percentages >= 50 and < 75
    } else {
      return "#FF0000"; // Red for percentages < 50
    }
  };

  // Get the stroke color based on the confidence percentage
  const strokeColor = getStrokeColor(confidencePercent);

  return (
    <div>
      <CircularProgressbar
        value={confidencePercent}
        text={`${confidencePercent}%`}
        strokeWidth={11}
        styles={{
          path: {
            stroke: strokeColor, // Set the stroke color dynamically
          },
          trail: {
            stroke: "#d6d6d6",
          },
          text: {
            fill: "black",
          },
        }}
      />
    </div>
  );
}

export default ProgressBar;
