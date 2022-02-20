import React, { useState, useEffect } from 'react';
import './searchResults.css';
import { ADD_FRIEND } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { addFriendIds, getAddedFriendIds} from '../../utils/localStorage';
import { useQuery, gql } from '@apollo/client';

const SearchResults = () => {

    // create state for holding returned searched friend data
    const [searchedFriends, setSearchedFriends] = useState([]);

    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    // create state to hold added friends values
    const [addedFriendIds, setAddedFriendIds] = useState(getAddedFriendIds());

    // create mutation to add a friend to friends values
    const [addFriend, {error}] = useMutation(ADD_FRIEND);

    // set up useEffect hook to save 'addedFriendsIds' list to localStorage on component unmount
    useEffect(() => {
        return () => addedFriendIds(addedFriendIds);
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

            setSearchedFriends(userData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // create function to handle adding a friend to our database
    const handleAddFriend = async (friendId) => {
        
        // find the friend in 'searchedFriends' state by the matching id
        const friendToAdd = searchedFriends.find((friend) => friend.friendId === friendId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addFriend({
                variables: { friendData: friendToAdd },
            });

            // if friend succesfully saves to user's account, add friend id to state
            setAddedFriendIds([...addedFriendIds, friendToAdd.friendId]);
        } catch (err) {
            console.console.error(err);
        }
    };


    return(
        <>

            <div className='mainContainer'>

            <div className="searchBarContainer">
                <input className="searchBar" placeholder="Search for a friend"></input>
            </div>

            <div class="ui cards">
                <div class="card">
                    <div class="content">
                        <div class="header">
                            Ryan P.
                        </div>
                        <div class="meta">
                            Friends of Val.
                        </div>
                        <div class="description">
                            Ryan wants to be your friend.
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="ui two buttons">
                            <div class="ui basic green button">Approve</div>
                            <div class="ui basic red button">Decline</div>
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
                            Laurel wants to be your friend.
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="ui two buttons">
                            <div class="ui basic green button">Approve</div>
                            <div class="ui basic red button">Decline</div>
                        </div>
                    </div>
                </div>
            </div>

            </div>    
        
        </>
    )
}

export default SearchResults;