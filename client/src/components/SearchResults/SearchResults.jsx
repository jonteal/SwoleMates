import React, { useState, useEffect } from 'react';
import './searchResults.css';
import { ADD_FOLLOW } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { addUserIds, getAddedUserIds} from '../../utils/localStorage';
import { useQuery, gql } from '@apollo/client';

const SearchResults = () => {

    // create state for holding returned searched user data
    const [searchedUsers, setSearchedUsers] = useState([]);

    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    // create state to hold added users' values
    const [addedUserIds, setAddedUserIds] = useState(getAddedUserIds());

    // create mutation to add a user to the user's values
    const [addFollow, {error}] = useMutation(ADD_FOLLOW);

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
            // !!!! HOW DO WE GRAB FROM GRAPHQL? !!!!!
            const response = await fetch(`${searchInput}`);

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
                <input className="searchBar" placeholder="Search for a user"></input>
            </div>

            <div class="ui cards">
                <div class="card">
                    <div class="content">
                        <div class="header">
                            Ryan P.
                        </div>
                        <div class="meta">
                            Followed by Val.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <div class="header">
                            Laurel T.
                        </div>
                        <div class="meta">
                            New Member
                        </div>
                        <div class="description">
                            Laurel started following you.
                        </div>
                    </div>
                </div>
            </div>

            </div>    
        
        </>
    )
}

export default SearchResults;