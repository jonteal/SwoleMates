import React from "react";
import "./tracker.css";
import LogSwole from "./Exercise";
import DisplaySwole from "./Workout";

const Tracker = () => {
  return (
    <>
      <div className="trackerContainer">
        <DisplaySwole />
      </div>

      <div className="workoutBtn">
        <button className="button-30" role="button">
          + Log Workout
        </button>
      </div>
    </>
  );
};

export default Tracker;
