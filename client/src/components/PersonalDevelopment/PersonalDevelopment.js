import React, { useState } from "react";
import './personaldevelopment.css';

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
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What is your WHY?"
                    type="text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button>
                    Save
                </button>
            </form>
        </div>
    )
}

export default PersonalDevelopment;