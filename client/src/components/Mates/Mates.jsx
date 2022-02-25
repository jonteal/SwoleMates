import React from "react";
import './mates.css';
import PersonalProfile from "../PersonalProfile/PersonalProfile";
import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";


const Mates = () => {

    return(
        <>

            <div className="mainContainer">
                <h1>Mates</h1>
                

                <div className="personalProfile">
                    <PersonalProfile />
                </div>

                <div className="searchMate">         
                    <Link to="/search"><h2>Search for a SwoleMate</h2></Link>
                </div>

            </div>
        </>
    )
}



export default Mates;