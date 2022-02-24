import React, { useState, useEffect } from "react";
import './followingContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { removeUserId, addUserId } from '../../utils/localStorage';

const FollowingContainer = () => {


    const [user, setUser] = useState({});

    // console.log(AuthService.getProfile());
    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });
    
    useEffect(() => {
        if (data) {
            setUser(data.getMe);
        }
    }, [data])

    if (loading) {
        return <p>Loading</p>
    }

    // const followers = user?.followers || [];
    const following = user?.following || [];

    return (
        <>
            <h1>People I follow</h1>

            

            <div className="followingList">
                <ul>
                {following.map(following => (
                    <li key={following._id}>
                    
                    <div className="ui card">
                        <div className="content">
                            <a className="header">{`${following.firstName} ${following.lastName}`}</a>
                        </div>
                        <div className="extra content">
                        <a>
                        <i className="user icon"></i>
                            22 Followers
                        </a>
                        <a>
                        <i className="user icon dataRight"></i>
                            15 Following
                        </a>
                        
                        </div>

                        <button className="followUnfollowBtn ui button">
                            Follow
                        </button>

                    </div>

                    </li>
                ))}
                </ul>
            </div>



        </>
    )
















    // // const { loading, data } = useQuery(GET_ME);

    // const [user, setUser] = useState({});

    // const { loading, data } = useQuery(GET_ME, {
    //     variables: { id: AuthService.getProfile().data._id }
    // });

    // useEffect(() => {
    //     if (data) {
    //         setUser(data.getMe);
    //         console.log("---- fetched data ---");
    //         console.log(data);
    //     }
    // }, [data])

    // // const userData = data?.me || {};

    // const [unfollowUser, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // // const handleUnfollowUser = async (userId) => {
    // //     const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    // //     if (!token) {
    // //         return false;
    // //     }

    // //     try {
    // //         const { data } = await unfollowUser({
    // //             variables: { userId },
    // //         });

    // //         removeUserId(userId);
    // //     } catch {
    // //         console.error(error);
    // //     }
    // // };

    // // if (loading) {
    // //     return <h2>Loading...</h2>
    // // }

    // // const addedUserIds = userData.addedUsers.map((user) => user.userId);
    // // addUserId(addedUserIds);

    // // const following = user?.following || [];


    // return(
    //     <div className="mainContainer">
        
    //         <div>
    //             <h1>People I Follow</h1>
    //         </div>

    //         <div className="followingContainer">
    //         {/* <h2>
    //             {user.addedUsers.length
    //                 ? `Viewing ${user.addedUsers.length} saved ${user.addedUsers.length === 1 ? 'user' : 'users'}:`
    //                 : 'You have no added users!'}
    //         </h2> */}

    //         <div className="following">
    //             {user.addedUsers.map((user) => {
    //                 return (
    //                     <div key={user.userId}>
    //                         <div>
    //                             {/* I think we need to include names/usernames */}
    //                             <div>{user}</div>
    //                             {/* <button onClick={() => handleUnfollowUser(user.userId)}>
    //                                 Unfollow
    //                             </button> */}
    //                         </div>
                            
    //                     </div>
    //                 )
    //             })}
                
            
    //         </div>
        
    //         </div>
    //     </div>
    // )
}

export default FollowingContainer;