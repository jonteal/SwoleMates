import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import "./profile.css";
import '../LoginForm/loginForm.css'
import { Link } from 'react-router-dom'

//need to add mutation like add user

const Profile = (props) => {
  const [inputFirstName, setFirstName] = useState("");
  const [inputLastName, setLastName] = useState("");
  const [inputAge, setAge] = useState("");
  const [inputWeight, setWeight] = useState("");
  const [inputFeet, setFeet] = useState("");
  const [inputInches, setInches] = useState("");
  const [inputSex, setSex] = useState("");
  const [inputActive, setActive] = useState("");
  const [inputGoal, setGoal] = useState("");

  const [addProfile, { error }] = useMutation(ADD_PROFILE);

  function handleSubmit(event) {
    event.preventDefault();

    // alert(`A name was submitted: ${inputFirstName} ${inputLastName} with the following information:
    //     ${inputAge}
    //     ${inputWeight}
    //     ${inputFeet}
    //     ${inputSex}
    //     ${inputActive}
    //     ${inputGoal}
    //     `);

  }

  return (
    <>
      <div className="min-h-screen max-h-screen max-w-screen flex justify-center items-center loginBg">
        <div className="xl:w-1/3 xl:h-1/2 w-10/12 h-10/12 profileCard">
        <h2 className="text-3x1 font-bold mb-10 text-center font-fa loginTitle">
            PROFILE
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* <label className="profileLabel">First Name: </label> */}
              <input
                className="bg-gray-700 border-1 w-2/3 border-black"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

            <br />
            {/* <label className="profileLabel">Last Name: </label> */}
              <input
                className="bg-gray-700 border-1 w-2/3 m-b-1 border-black"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />

            <br />
            {/* <label className="profileLabel">Age: </label> */}
              <input
                className="bg-gray-700 w-2/3 border-1 border-black"
                type="number"
                min="0"
                max="120"
                name="age"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            <br />
            {/* <label className="profileLabel">Weight in lbs: </label> */}
              <input
                className="bg-gray-700 w-2/3 border-1 border-black"
                type="number"
                min="0"
                name="weight"
                placeholder="Weight (lbs)"
                onChange={(e) => setWeight(e.target.value)}
              />{" "}

            <br />
            {/* <label className="profileLabel">Height in inches: </label> */}
              <input
                className="bg-gray-700 w-2/3 border-1 border-black"
                type="number"
                min="0"
                max="11"
                name="inches"
                value={inputInches}
                placeholder="Height (inches)"
                onChange={(e) => setInches(e.target.value)}
              />{" "}

            <br />
            {/* <label className="profileLabel">Birth Sex: </label> */}
            <select 
              className="bg-gray-700 w-2/3 border-1 border-black"
              onChange={(e) => setSex(e.target.value)}>
              <option selected value="" disabled selected>Birth Sex</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <br />
            {/* <label className="profileLabel">Lifestyle: </label> */}

            <select
            className="bg-gray-700 w-2/3 border-1 border-black"
              value={inputActive}
              onChange={(e) => setActive(e.target.value)}>
              <option selected value="" disabled selected>Lifestyle</option>
              <option value="1.2"> Sedentary</option>
              <option value="1.375">
                Lightly Active
              </option>
              <option value="1.55">
                Moderately Active
              </option>
              <option value="1.725">
                Very Active
              </option>
              <option value="1.9">
                Extra Active
              </option>
            </select>

          <br />

          {/* <label className="profileLabel">Goal: </label> */}
            <select 
            className="bg-gray-700 w-2/3 border-1 border-black"
            value={inputGoal} onChange={(e) => setGoal(e.target.value)
            }>
              <option selected value="" disabled selected>Fitness Goal</option>
              <option value="gain">Gain muscle</option>
              <option value="lose">Lose fat</option>
              <option value="maintain">
                Maintain
              </option>
            </select>
            <br />
            <Link to="/home">
            <button 
            className="loginBtn"
            onClick={(e) => handleSubmit(e)}>Submit</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;


{/* <br />
<input
  className="bg-gray-700 rounded-3xl border-1 border-black"
  type="file"
  name="userPhoto"
  accept="image/png, image/gif, image/jpeg"
/>
<br /> */}