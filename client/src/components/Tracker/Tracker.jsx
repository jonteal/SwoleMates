import React from "react";
import "./tracker.css";
import Workout from "./Workout";
import { Link } from 'react-router-dom'

const Tracker = () => {
  return (
    <>
      <div className="trackerContainer">
        <Workout />
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
