import React, { useState, useEffect } from 'react';
import './searchResults.css';
import { ADD_FRIEND } from './utils/mutations';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

const SearchResults = () => {

    // create state for holding returned searched friend data
    const [searchedFriends, setSearchedFriends] = useState([]);

    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    // create state to hold added friends values
    const [addedFriendsIds, setAddedFriendsIds] = useState(getAddedFriendsIds());

    // create mutation to add a friend to friends values
    const [addFriend, {error}] = useMutation(ADD_FRIEND);

    // set up useEffect hook to save 'addedFriendsIds' list to localStorage on component unmount
    useEffect(() => {
        return () => addedFriendsIds(addedFriendsIds);
    });



    return(
        <>

            <div className='mainContainer'>

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