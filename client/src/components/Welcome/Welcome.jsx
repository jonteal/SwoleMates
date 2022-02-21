import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../LoginForm/LoginForm";
import SwoleMates from "./SwoleMates";
import "./welcome.css";
import "./scrollbar.css";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const Welcome = () => {
  //represents whether the modal is open or not, start false bc modal closed initially
  const [openLogin, setLogin] = useState(false);
  const [scrollTop, setScrollTop] = useState();
  const [scrolling, setScrolling] = useState();
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  useEffect(() => {
    console.log(scrolling);
  }, [scrolling]);

  return (
    <>
      <div className="welcomeMain">
        {!openLogin && (
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
                <div
                  className="animate-bounce p-2 w-10 h-10 ring-1 ring-black shadow-lg rounded-full flex items-center justify-center cursor-pointer bounceArrow"
                  onClick={() => {
                    setLogin(true);
                  }}
                >
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
        )}

        {openLogin && (
          <>
            {/* <CSSTransitionGroup
              transitionName="topToBottom"
              transitionAppear={true}
              transitionAppearTimeout={5000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <SwoleMates />
            </CSSTransitionGroup> */}
            <CSSTransitionGroup
              transitionName="bottomToTop"
              transitionAppear={true}
              transitionAppearTimeout={5000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Login onScroll={(event) => setScrolling(event)} />
            </CSSTransitionGroup>
          </>
        )}
      </div>
    </>
  );
};

export default Welcome;
