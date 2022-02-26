import React, { useState, useEffect } from "react";
import './followersContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from "../../utils/queries";
import { FOLLOW_UNFOLLOW } from "../../utils/mutations";
import AuthService from "../../utils/auth";
import { addUserId, removeUserId } from '../../utils/localStorage';
import { Link } from 'react-router-dom';

const FollowersContainer = () => {



    const [user, setUser] = useState({});

    // console.log(AuthService.getProfile());
    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });

    const [followButton, {error}] = useMutation(FOLLOW_UNFOLLOW);


    const handleFollow = async (event) => {
        event.preventDefault();

        console.log((event.target.id));
        const db_followers = await followButton({
            variables: {_id: event.target.id}
        })

        console.log(db_followers);
        return db_followers;
    }
    
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

    // const followers = user?.followers || [];
    let followers = user?.followers || [];

    return (
        <>
            <h1>People that follow me</h1>

            {/* <h2>
                    {user.followers.length
                    ? `${user.followers.length}`
                    : 'No one is currently following you'}
            </h2> */}

            <div className="followerList">
                <ul>
                {followers.map(follower => (
                    <li key={follower._id}>
                    
                    <div className="ui card">
                        <div className="content">
                            <a className="header">{`${follower.firstName} ${follower.lastName}`}</a>
                        </div>
                        <div className="extra content">
                        {/* <a>
                        <i className="user icon"></i>
                            22 Followers
                        </a>

                        <a>
                        <i className="user icon dataRight"></i>
                            15 Following
                        </a> */}
                        </div>

                        <button className="followUnfollowBtn ui button"
                            id={follower._id}
                            onClick={handleFollow}
                        >
                            Follow
                        </button>

                    </div>

                    </li>
                ))}
                </ul>

                
            </div>

            <div className="homeBtnContainer">
                <Link to='/mates'><button className="ui primary basic button">Back to Me</button></Link>
            </div>



        </>
    )





    // const { loading, data } = useQuery(QUERY_USER);
    // const userData = data?.me || {};

    // const [followUser, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // // Might want an event handler if we just want to select one of our followers
    // // and navigate to their page


    // const handleFollowUser = async (userId) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await followUser({
    //             variables: { userId },
    //         });

    //         addUserId(userId);
    //     } catch {
    //         console.error(error);
    //     }
    // }


    // if (loading) {
    //     return <h2>Loading...</h2>
    // }

    // const followerUserIds = userData.followers.map((user) => user.userId);
    // removeUserId(followerUserIds);

    // return (
    //     <div className="mainContainer">
    //         <div>
    //             <h1>People Following Me</h1>
    //         </div>

    //         <div className="followersContainer">
    //         <h2>
    //             {userData.followers.length
    //                 ? `${userData.followers.length}`
    //                 : 'No one is currently following you'}
    //         </h2>

    //         <div className="followers">
    //             {userData.followers.map((user) => {
    //                 return (
    //                     <div key={user.userId}>
    //                         <div>
    //                             <div>{user}</div>
    //                             <button onClick={() => handleFollowUser(user.userId)}>
    //                                 Follow
    //                             </button>
    //                         </div>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //         </div>
    //     </div>
    // )
}

export default FollowersContainer;