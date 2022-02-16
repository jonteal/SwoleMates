import React, { useState } from "react";

const PersonalDevelopment = () => {

    const [text, setText] = useState('');
    return (
        <div>
            <form>
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