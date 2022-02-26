import React, { useState, useEffect } from "react";
import './followingContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { removeUserId, addUserId } from '../../utils/localStorage';
import { Link } from "react-router-dom";
import { GET_PROFILE } from '../../utils/queries';
import Account from "../Account/Account";

const FollowingContainer = () => {


    // Declare user variable, setUser method to update state of user
    const [user, setUser] = useState({});

    // Implement useQuery to enact the GET_ME query using 
    // id as the variable that filters the data
    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });

    const [followButton, { error }] = useMutation(FOLLOW_UNFOLLOW);

    // ========= CHECK SENT AND RETURNED DATA ===========
    const handleFollow = async (event) => {
        event.preventDefault();

        const db_following = await followButton({
            variables: { _id: event.target.id }
        })

        return db_following;
    }

    let following = user?.following || [];

    // 
    useEffect(() => {
        if (data) {
            setUser(data.getMe);
        }

        following = user?.following || [];
    }, [data])

    if (loading) {
        return <p>Loading...</p>
    }




    return (
        <>
            <h1>People I follow</h1>

            <div className="followingList">
                <ul>

                    {following.map(following => (
                        <li key={following._id}>

                            <div className="ui card">
                                <div className="content">
                                    <Link to={`/account/${Account._id}`} className="header">{`${following.firstName} ${following.lastName}`}</Link>
                                </div>
                                <div className="extra content">
                                    {/* <a>
                        <i className="user icon"></i>
                            {following.followers?.length || 0} Followers
                        </a>
                        <a>
                        <i className="user icon"></i>
                            {following.following?.length || 0} Following
                        </a> */}

                                </div>

                                <button className="followUnfollowBtn ui button"
                                    id={following._id}
                                    onClick={handleFollow}
                                >
                                    Follow
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Back to Personal Profile */}
            <div className="homeBtnContainer">
                <Link to='/mates'><button className="ui primary basic button">Back to Me</button></Link>
            </div>
        </>
    )
}

export default FollowingContainer;