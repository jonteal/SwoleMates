import React, { useState } from "react";

import './personalDevelopment.css';

const PersonalDevelopment = () => {

    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { text }

        // Can we use a POST fetch request and post this user input to our "HomePage"?
        // Location of fetch request can be where it will populate on homepage. Something like 
        // 'http://localhost:8000/goals' or something
        fetch('', {         
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(() => {
            console.log('new personal development goal added!')
        })

    }
    return (
        <div className="dev-container filter drop-shadow-lg">
            <form className="dev-form" onSubmit={handleSubmit}>
                <textarea
                    className="dev-input"
                    rows="2"
                    cols="30"
                    placeholder="What is your WHY?"
                    type="text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="dev-btn filter drop-shadow-lg">
                    Save
                </button>
            </form>
        </div>
    )
}

export default PersonalDevelopment;