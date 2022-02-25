import React, { useState, useEffect } from 'react';
// import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import Auth from '../../utils/auth';
// import { useMutation } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { GET_SEARCHED_USER } from '../../utils/queries';


const Search = () => {


    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    const { loading, data } = useQuery();


    // set up useEffect hook to save 'addedUsersIds' list to localStorage on component unmount
    useEffect(() => {
    });

    // create method to search for users and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            useQuery(GET_SEARCHED_USER, {
                variables: { email: searchInput }
            })

            console.log(data);
            setSearchInput('');
        } catch (err) {
            console.error(err);
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
                        {/* <Link to='/personalprofile'><button class="ui primary basic button">Back to Me</button></Link> */}
                    </div>
                </form>
            </div>


            </div>    
        
        </>
    )
}

export default Search;