import React from "react";
import PersonalProfile from "../PersonalProfile/PersonalProfile";
import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";


const Mates = () => {

    return(
        <>
                <div className="matesBg pt-10">

            <div className="matesContainer pt-5">
                

                <div className="personalProfile">
                    <PersonalProfile />
                </div>

                {/* <div className="searchMate">         
                    <Link to="/search"><h2>Search for a SwoleMate</h2></Link>
                </div> */}

            </div>
            </div>
        </>
    )
}



export default Mates;