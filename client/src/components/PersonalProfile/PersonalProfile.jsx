import React, { useEffect, useState } from "react";
import { Card, Icon } from 'semantic-ui-react';
import './personalProfile.css';
import { useQuery } from '@apollo/client';
import { GET_ME } from "../../utils/queries";
import auth from "../../utils/auth";

// Personal Profile component - Displays user's profile
const PersonalProfile = () => {
    const [user, setUser] = useState({});

    const { loading, data } = useQuery(GET_ME, {
        variables: { id: auth.getProfile().data._id }
    });
    
    useEffect(() => {
        if (data) {
            setUser(data.getMe);
            console.log("---- fetched data ---");
            console.log(data);
        }
    }, [data])

    console.log("---- fetched user ---");
    console.log(user);

    if (loading) {
        return <p>Loading</p>
    }

    const followers = user?.followers || [];
    const following = user?.following || [];

    return (
        <>
            <Card className="personalProfileCard"
                header={user.firstName}
                meta='User'
                description={user.goal}
                // extra={extra}
            />
            <div>
            <h1>Followers</h1>
                <ul>
                {followers.map(follower => (
                    <li key={follower._id}>{`${follower.firstName} ${follower.lastName}`}</li>
                ))}
                </ul>
            </div>

            {/* <h1>Following</h1>
                <ul>
                {followers.map(follower => (
                    <li key={follower._id}>{`${follower.firstName} ${follower.lastName}`}</li>
                ))}
                </ul>
            </div> */}



        </>
    )
}

export default PersonalProfile;
