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

        <div className="personalProfileMain">
            <Card className="personalProfileCard"
                header={user.firstName}
                // meta='User'
                description={`My current goal is to ${user.goal}!`}
                // extra={extra}
            />
            <div className="followerBox">
            <Link to="/followers"><h1>Followers</h1></Link>
                <ul>
                {followers.map(follower => (
                    <Link><li key={follower._id}>{`${follower.firstName} ${follower.lastName}`}</li></Link>
                ))}
                </ul>
            </div>

            <div className="followingBox">
            <Link to="/following"><h1>Following</h1></Link>
                <ul>
                {following.map(following => (
                    <Link><li key={following._id}>{`${following.firstName} ${following.lastName}`}</li></Link>
                ))}
                </ul>
            </div>

        </div>
            





        </>
    )
}

export default PersonalProfile;
