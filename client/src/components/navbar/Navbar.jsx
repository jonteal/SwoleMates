import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import { IconContext } from "react-icons";
import { NavbarData } from "./navbarData";
import "./navbar.css";

import AuthService from "../../utils/auth";

const Navbar = () => {
  console.log("we are in the navbar");
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      {AuthService.loggedIn() === true && (
        <div className="nav">
          <IconContext.Provider value={{ color: "#fff" }}>
            <div className="navbar">
              <button to="#" className="menuBars">
                <AiIcons.AiOutlineMenu onClick={showSidebar} />
                {/* <CgIcons.CgClose onClick={showSidebar} /> */}
              </button>
              <span className="nav-title">Menu</span>
              <div className="nav-name">SwoleMates</div>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                {NavbarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </div>
      )}
    </>
  );
};

export default Navbar;
