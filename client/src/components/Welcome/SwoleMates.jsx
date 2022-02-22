import React from "react";

const SwoleMates = () => {
  return (
    <div className="welcomeContainer">
      <div className="container">
        <div className="shadows">
          <span>S</span>
          <span>W</span>
          <span>O</span>
          <span>L</span>
          <span>E</span>
          <span>M</span>
          <span>A</span>
          <span>T</span>
          <span>E</span>
          <span>S</span>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-end">
          <div className="animate-bounce p-2 w-10 h-10 ring-1 ring-black shadow-lg rounded-full flex items-center justify-center cursor-pointer bounceArrow">
            <svg
              className="w-6 h-6 text-violet-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default SwoleMates;
