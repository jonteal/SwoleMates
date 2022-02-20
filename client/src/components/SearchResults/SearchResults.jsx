import React from 'react';
import './searchResults.css';


const SearchResults = () => {
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