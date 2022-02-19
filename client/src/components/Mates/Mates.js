import React from "react";
import './mates.css';
import PostCard from '../PostCard/PostCard';

import { useQuery } from "@apollo/client";


const Mates = () => {

    return (
        <>
            <div className="mainContainer">
                <input className="search" placeholder="Search for a mate"></input>


            </div>
        </>
    )
}



export default Mates;