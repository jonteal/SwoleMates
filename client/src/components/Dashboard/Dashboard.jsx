import React, { useState, useEffect } from "react";
import Quote from "../Quote/Quote";
import PersonalDevelopment from "../PersonalDevelopment/PersonalDevelopment";
import Weight from "../Weight/Weight";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./dashboard.css";

import BarChart from "../Chart/Chart";

const progressData = [{ bgcolor: "#6a1b9a", completed: 80 }];
const data = 1200;

const exerciseData = [{ bgcolor: "#00695c", completed: 40 }];
const exercise = 200;

const Home = () => {
  return (
    <>
      <div className="pt-5 homeContainer">
        <div className="homeCard">
          <BarChart />
        </div>

        <div className="homeCard">
          <Weight />
        </div>

        <div className="homeCard">
          <PersonalDevelopment />
        </div>

        <div className="pb-5 homeCard">
          <Quote />
        </div>
      </div>
    </>
  );
};

export default Home;
