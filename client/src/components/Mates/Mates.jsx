import React from "react";
import './mates.css';
import PersonalProfile from "../PersonalProfile/PersonalProfile";
import FollowersContainer from "../FollowersContainer/FollowersContainer";
import FollowingContainer from "../FollowingContainer/FollowingContainer";
import 'semantic-ui-css/semantic.min.css';

import { useQuery } from "@apollo/client";
import SearchResults from "../SearchResults/SearchResults";


const Mates = () => {

    return(
        <>

            <div className="mainContainer">
                <h1>Mates</h1>
                {/* <div>
                    <SearchResults/>
                </div> */}

                <div className="personalProfile">
                    <PersonalProfile />
                </div>

                {/* <div>
                    <a><FollowersContainer />Followers</a>
                </div> */}

                {/* <div className="searchResults">
                    <a><FollowingContainer />Following</a>
                </div>  */}

            </div>
        </>
    )
}



export default Mates;