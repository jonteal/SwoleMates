import React, {useState, useEffect } from 'react';
import Quote from '../Quote/Quote';
import PersonalDevelopment from '../PersonalDevelopment/PersonalDevelopment';
import Weight from '../Weight/Weight';
import './dashboard.css';

const Home = () => {
    return (
        <>
        <div className="card-container">
            <div className="development shadow-2xl">
                < PersonalDevelopment />
            </div>
            <div className="weight shadow-2xl">
                < Weight />
            </div>
            <div className="nutrition shadow-2xl">
                <div className="food-container-placeholder">
                    <div className="food-card-placeholder">
                        <div className="food-calories-placeholder">Calories:</div>
                        <div className="food-bar-placeholder"></div>
                        <div className="amount-placeholder">1500/1500</div>
                    </div>
                </div>
            </div>
            <div className="quote-container">
                < Quote />
            </div>
        </div>
        </>
    )
}

export default Home;