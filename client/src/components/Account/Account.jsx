import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { GET_ACCOUNT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import AuthService from '../../utils/auth';
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";


const Account = () => {

    // Define user, setUser method and initial state of User
    const [user, setUser] = useState({});

    // Implement useQuery to enact GET_ACCOUNT query
    const { loading, data } = useQuery(GET_ACCOUNT, {
        variables: { id: AuthService.getProfile().data._id }
    });

    // Implement useEffect to enace setUser state update if data 
    // is present. 
    useEffect(() => {
        if (data) {
            setUser(data.getAccount);
        }
    }, [data]);

    const { id } = useParams();

    // Show "Loading" until page loads
    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>Hello</h1>

            <div className="personalProfileMain">

                {/* Profile Card */}
                <Card className="personalProfileCard"
                    header={user.firstName}
                    description={`My current goal is to ${user.goal}!`}
                />

                {/* User's Followers */}
                <div className="followerBox">
                    <Link to="/followers"><h1>Followers</h1></Link>
                </div>

                {/* People the User is Following*/}
                <div className="followingBox">
                    <Link to="/following"><h1>Following</h1></Link>
                </div>



                {/* Back to Personal Profile */}
                <div className="homeBtnContainer">
                    <Link to='/personalprofile'><button className="ui primary basic button">Back to Me</button></Link>
                </div>

            </div>

        </>
    )
}

export default Account;