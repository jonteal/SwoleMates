import React from "react";
import './mates.css';
import PersonalProfile from "../PersonalProfile/personalProfile";
import FriendsContainer from "../FriendsContainer/FriendsContainer";
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

                <div className="searchResults">
                    <FriendsContainer />
                </div>

            </div>
        </>
    )
}



export default Mates;