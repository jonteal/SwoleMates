import React from "react";
import './followingContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { removeUserId, addUserId } from '../../utils/localStorage';

const FollowingContainer = () => {

    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me || {};

    const [unfollowUser, {error}] = useMutation(FOLLOW_UNFOLLOW);

    const handleUnfollowUser = async (userId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await unfollowUser({
                variables: { userId },
            });

            removeUserId(userId);
        } catch {
            console.error(error);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>
    }

    const addedUserIds = userData.addedUsers.map((user) => user.userId);
    addUserId(addedUserIds);


    return(
        <div className="mainContainer">
        
            <div>
                <h1>People I Follow</h1>
            </div>

            <div className="followingContainer">
            <h2>
                {userData.addedUsers.length
                    ? `Viewing ${userData.addedUsers.length} saved ${userData.addedUsers.length === 1 ? 'user' : 'users'}:`
                    : 'You have no added users!'}
            </h2>

            <div className="following">
                {userData.addedUsers.map((user) => {
                    return (
                        <div key={user.userId}>
                            <div>
                                {/* I think we need to include names/usernames */}
                                <div>{user}</div>
                                <button onClick={() => handleUnfollowUser(user.userId)}>
                                    Unfollow
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

export default FollowingContainer;