import React, { useState, useEffect } from "react";
import Quote from "../Quote/Quote";
import PersonalDevelopment from "../PersonalDevelopment/PersonalDevelopment";
import Weight from "../Weight/Weight";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./dashboard.css";

const progressData = [{ bgcolor: "#6a1b9a", completed: 80 }];
const data = 1200;

const exerciseData = [{ bgcolor: "#00695c", completed: 40 }];
const exercise = 200;

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <div className="quotation">
          <Quote />
        </div>

        <div className="calories shadow-2xl">
          <div className="calories-title">
            Calories Consumed: <span>{data}/1500</span>
          </div>
          <div className="calories-consumed">
            {" "}
            {progressData.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}
              />
            ))}
          </div>
          <div className="calories-title">
            Calories Burned: <span>{exercise}/500</span>
          </div>
          <div className="calories-burned">
            {exerciseData.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}
              />
            ))}
          </div>
        </div>

        <div className="weight shadow-2xl">
          <Weight />
        </div>

        <div className="development shadow-2xl">
          <PersonalDevelopment />
        </div>
      </div>
    </>
  );
};

export default Home;
