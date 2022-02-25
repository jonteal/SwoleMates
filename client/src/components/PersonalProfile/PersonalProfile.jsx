import React, { useEffect, useState } from "react";
import { Button, Card, Icon } from 'semantic-ui-react';
import './personalProfile.css';
import { useQuery } from '@apollo/client';
import { GET_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import FollowersContainer from "../FollowersContainer/FollowersContainer";
import FollowingContainer from "../FollowingContainer/FollowingContainer";
import { Link } from 'react-router-dom';

// Personal Profile component - Displays user's profile
const PersonalProfile = () => {
    const [user, setUser] = useState({});

    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });
    
    useEffect(() => {
        if (data) {
            setUser(data.getMe);
        }
    }, [data])


    if (loading) {
        return <p>Loading...</p>
    }

    const followers = user?.followers || [];
    const following = user?.following || [];

    return (
        <>

        <div className="personalProfileMain">

            {/* Profile Card */}
            <Card className="personalProfileCard"
                header={user.firstName}
                description={`My current goal is to ${user.goal}!`}
            />

            {/* Logged in user's Followers */}
            <div className="followerBox">
                <Link to="/followers"><h1>Followers</h1></Link>
            </div>

            {/* People the Logged in User is Following*/}
            <div className="followingBox">
                <Link to="/following"><h1>Following</h1></Link>
            </div>

        </div>
            





        </>
    )
}

export default PersonalProfile;
