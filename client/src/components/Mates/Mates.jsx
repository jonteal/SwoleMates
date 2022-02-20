import React from "react";
import './mates.css';
import ProfileCard from "../ProfileCard/ProfileCard";

import { useQuery } from "@apollo/client";


const Mates = () => {

    return (
        <>

            <div className="mainContainer">
                <input className="search" placeholder="Search"></input>

            </div>
        </>
    )
}



export default Mates;