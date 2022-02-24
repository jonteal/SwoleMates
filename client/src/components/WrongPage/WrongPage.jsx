import React from "react";
import { Link } from "react-router-dom";
import workoutFail from "../../media/workout-fail.jpeg";
import "./wrongPage.css";

const WrongPage = () => {
  return (
    <>
      <div className="errorBox">
        <div className="error">
          <span className="number">4</span>
          <span className="number">0</span>
          <span className="number">4</span>
        </div>
        <div className="imageBox">
          <img src={workoutFail} alt="workout-fail" className="failPhoto" />
        </div>
        <div className="messageBox">
          <div className="message">
            <span className="funnyMessage">Looks like you need a spot!</span>
            <span className="infoMessage">
              The page you're looking for doesn't exist.
            </span>
            <span className="goBack">
              <Link to="/" className="button">
                Go Back
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WrongPage;
