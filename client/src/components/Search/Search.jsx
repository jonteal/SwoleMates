import React, { useState, useEffect } from 'react';
// import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SEARCHED_USER } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import './search.css';

const Search = () => {


    // create state for holding our search field data
    const  [searchInput, setSearchInput] = useState('');

    const { loading, data } = useQuery(GET_SEARCHED_USER, {
        variables: { email: searchInput }
    });

    const [userstate, setUserstate] = useState(<div></div>);

    let searchedUser = userstate;

    const [followButton, {error}] = useMutation(FOLLOW_UNFOLLOW);

    const handleFollow = async (event) => {
        event.preventDefault();

        console.log((event.target.id));
        const db_searched = await followButton({
            variables: {_id: event.target.id}
        })

        console.log(db_searched);
        return db_searched;
    }

    // create method to search for users and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(data?.getSearchedUser[0]._id);
        
        if (data?.getSearchedUser[0]._id) {
            console.log("user exists");
            setUserstate(<div className='searchReturn'><div className='nameResult'>{`${data?.getSearchedUser[0].firstName} ${data?.getSearchedUser[0].lastName}`}</div>                        
                <button className="followUnfollowBtn ui teal basic button"
                    id={data?.getSearchedUser[0]._id}
                    onClick={handleFollow}
                >Follow</button></div>);
            

        } else {
            console.log("user does not exists");
        
            setUserstate(<div>No Search Results Found</div>);
            console.log(searchedUser);
            
        }
        
    };

    return(
        <>

            <div className='searchMainContainer'>

            <div className="searchBarContainer">
                <h1 className="searchTitle">Search for a SwoleMate!</h1>
                <form className='searchForm' onSubmit={handleFormSubmit}>
                    <div className="searchDiv">
                    <input
                    className="searchInputCard"
                        name='searchInput'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        placeholder='Search by email'
                    />
                    <button type='submit' className="searchBtn">
                        Search
                    </button>
                    </div>


                    <div className="ui card">
                        <div>{searchedUser}</div>
                    </div>

                    <div className="homeBtnContainer">
                        <Link to='/mates'><button className="ui primary basic button">Back to Me</button></Link>
                    </div>

                </form>
            </div>


            </div>    
        
        </>
    )
}

export default Search;