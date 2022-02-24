import React, { useState, useEffect } from 'react';
import './searchResults.css';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { addUserIds, getAddedUserIds} from '../../utils/localStorage';
import { useQuery, gql } from '@apollo/client';
import { matchPath } from "react-router";
import { Link } from 'react-router-dom';


const SearchResults = () => {

    // create state for holding returned searched user data
    const [searchedUsers, setSearchedUsers] = useState([]);

    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    // create state to hold added users' values
    const [addedUserIds, setAddedUserIds] = useState(getAddedUserIds());

    // create mutation to add a user to the user's values
    const [addFollow, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // set up useEffect hook to save 'addedUsersIds' list to localStorage on component unmount
    useEffect(() => {
        return () => addedUserIds(addedUserIds);
    });

    // create method to search for users and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await fetch(`${searchInput}`);

            // FOUND ON REACT DOCS
            // const match = matchPath("/users/?", {
            //     path: "/users/:id",
            //     exact: true,
            //     strict: false
            // });

            if (!response.ok) {
                throw new Error ('something went wrong!');
            }

            const { items } = await response.json();

            const userData = items.map((user) => ({
                userId: user.id
            }));

            setSearchedUsers(userData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // create function to handle adding a user to our database
    const handleAddFollow = async (userId) => {
        
        // find the user in 'searchedUsers' state by the matching id
        const userToAdd = searchedUsers.find((user) => user.userId === userId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addFollow({
                variables: { userData: userToAdd },
            });

            // if user succesfully saves to user's account, add user id to state
            setAddedUserIds([...addedUserIds, userToAdd.userId]);
        } catch (err) {
            console.console.error(err);
        }
    };


    return(
        <>

            <div className='mainContainer'>

            <div className="searchBarContainer">
                <h1>Search for a SwoleMate!</h1>
                <form className='searchForm' onSubmit={handleFormSubmit}>
                    <input
                        name='searchInput'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        placeholder='Search for a user'
                    />
                    <button type='submit' className="ui secondary basic button">
                        Search
                    </button>

                    <div className="homeBtnContainer">
                        <Link to='/personalprofile'><button class="ui primary basic button">Back to Me</button></Link>
                    </div>
                </form>
            </div>

            <div className='searchResults'>
                <h2>
                    {searchedUsers.length
                        ? `Viewing ${searchedUsers.length} results:`
                        : ''}
                </h2>

                <div className='profileResults'>
                    {searchedUsers.map((user) => {
                        return(
                            <div class="card">
                                <div class="content">
                                    <div class="header">
                                        {/* Searched User's name */}
                                    </div>

                                    <div class="meta">
                                        {/* Follower count */}
                                        {/* {`Followed by ${user.followers.length} people`} */}
                                    </div>

                                    <div>
                                        {/* Show if user already follows you? */}

                                    </div>

                                    <div>
                                        {/* If we don't already follow them, give option to follow. */}
                                        {Auth.loggedIn() && (
                                            <button className="ui secondary basic button"
                                                disabled={addedUserIds?.some((addedUserId) => addedUserId === user.userId)}
                                                onClick={() => handleAddFollow(user.userId)}>
                                                {addedUserIds?.some((addedUserId) => addedUserId === user.userId)
                                                ? 'You already follow this person.'
                                                : 'Follow'}
                                            </button>
                                        )}
                            
                                    </div>
                    
                                </div>
                            </div>
                            )
                        })}
                </div>
            </div>

            </div>    
        
        </>
    )
}

export default SearchResults;