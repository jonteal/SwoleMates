import React from "react";
import './mates.css';
import PersonalProfile from "../PersonalProfile/personalProfile";
// import FollowersContainer from "../FollowersContainer/FollowersContainer";
// import FollowingContainer from "../FollowingContainer/FollowingContainer";
import 'semantic-ui-css/semantic.min.css';

import { useQuery } from "@apollo/client";
import SearchResults from "../SearchResults/SearchResults";


const Mates = () => {

    return(
        <>

            <div className="mainContainer">
                <div>
                    <input className="search" placeholder="Search"></input>
                </div>

                <div className="personalProfile">
                    <PersonalProfile />
                </div>

                {/* <div className="searchResults">
                    <FollowersContainer />
                </div>

                <div className="searchResults">
                    <FollowingContainer />
                </div> */}

            </div>
        </>
    )
}



export default Mates;