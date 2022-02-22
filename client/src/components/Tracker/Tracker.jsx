import React from "react";
import "./tracker.css";
import LogSwole from "./Exercise";
import DisplaySwole from "./Workout";
import { Link } from 'react-router-dom'

const Tracker = () => {
  return (
    <>
      <div className="trackerContainer">
        <DisplaySwole />
      </div>

      <div className="workoutBtn">
        <Link to="/logworkout" className="button-30" role="button">
          + Log Workout
        </Link>
      </div>
    </>
  );
};

export default Tracker;
