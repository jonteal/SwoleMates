import React, { useState } from "react";
import "./personalDevelopment.css";

const PersonalDevelopment = () => {
  const [inputWhy, setWhy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setWhy(e.target.value);
    console.log(inputWhy)


    // Can we use a POST fetch request and post this user input to our "HomePage"?
    // Location of fetch request can be where it will populate on homepage. Something like
    // 'http://localhost:8000/goals' or something

  };
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
          onChange={handleSubmit}
          value={inputWhy}
        />
        <button className="dev-btn filter drop-shadow-lg" onChange={(e) => setWhy(e)}>Save</button>
      </form>
    </div>
  );
};

export default PersonalDevelopment;
