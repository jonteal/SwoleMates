import React from "react";
import './followersContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WEIGHT } from "../../utils/queries";
import { FOLLOW_UNFOLLOW } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { addUserId, removeUserId } from '../../utils/localStorage';

const FollowersContainer = () => {

    const { loading, data } = useQuery(GET_WEIGHT);
    const userData = data?.me || {};

    const [followUser, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // Might want an event handler if we just want to select one of our followers
    // and navigate to their page


    const handleFollowUser = async (userId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await followUser({
                variables: { userId },
            });

            addUserId(userId);
        } catch {
            console.error(error);
        }
    }


    if (loading) {
        return <h2>Loading...</h2>
    }

    const followerUserIds = userData.followers.map((user) => user.userId);
    removeUserId(followerUserIds);

    return (
        <div className="mainContainer">
            <div>
                <h1>People Following Me</h1>
            </div>

            <div className="followersContainer">
            <h2>
                {userData.followers.length
                    ? `${userData.followers.length}`
                    : 'No one is currently following you'}
            </h2>

            <div className="followers">
                {userData.followers.map((user) => {
                    return (
                        <div key={user.userId}>
                            <div>
                                <div>{user}</div>
                                <button onClick={() => handleFollowUser(user.userId)}>
                                    Follow
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

export default FollowersContainer;