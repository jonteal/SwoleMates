import React, { useEffect, useState } from "react";
import { Card, Icon } from 'semantic-ui-react';
import './personalProfile.css';
import { useQuery } from '@apollo/client';
import { GET_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import FollowersContainer from "../FollowersContainer/FollowersContainer";
import FollowingContainer from "../FollowingContainer/FollowingContainer";

// Personal Profile component - Displays user's profile
const PersonalProfile = () => {
    const [user, setUser] = useState({});

    // console.log(AuthService.getProfile());
    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });
    
    useEffect(() => {
        if (data) {
            setUser(data.getMe);
            console.log("---- fetched data ---");
            console.log(data);
        }
    }, [data])

    console.log("---- fetched user ---");
    console.log(data);

    if (loading) {
        return <p>Loading</p>
    }

    const followers = user?.followers || [];
    const following = user?.following || [];

    return (
        <>
            <Card className="personalProfileCard"
                header={user.firstName}
                // meta='User'
                description={`My current goal is to ${user.goal}!`}
                // extra={extra}
            />
            <div className="followerBox">
            <a href={FollowersContainer}><h1>Followers</h1></a>
                <ul>
                {followers.map(follower => (
                    <li key={follower._id}>{`${follower.firstName} ${follower.lastName}`}</li>
                ))}
                </ul>
            </div>

            <div className="followingBox">
            <a href={FollowingContainer}><h1>Following</h1></a>
                <ul>
                {following.map(following => (
                    <li key={following._id}>{`${following.firstName} ${following.lastName}`}</li>
                ))}
                </ul>
            </div>



        </>
    )
}

export default PersonalProfile;
