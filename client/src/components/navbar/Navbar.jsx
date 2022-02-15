import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import { IconContext } from 'react-icons';
import { NavbarData } from './navbarData';
import './navbar.css';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
  return (
      
  <div className='nav'>
    <IconContext.Provider value={{ color: '#fff' }}>
    <div className="navbar">
        <Link to="#" className="menuBars">
            <AiIcons.AiOutlineMenu onClick={showSidebar} />
        </Link>
        <span className="nav-title">Menu</span>
        <div className="nav-name">
            SwoleMates
        </div>
    </div>
    <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
                <Link to='#' className="menu-bars">
                    <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {NavbarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </IconContext.Provider>
  </div>
  );
};

export default Navbar;