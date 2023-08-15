import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar() {
  return (
    <div>
      <CircularProgressbar
        value={76.6}
        text="76.6"
        strokeWidth={11}
        counterClockwise
        styles={{
          path: {
            stroke: "#22C55E",
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
