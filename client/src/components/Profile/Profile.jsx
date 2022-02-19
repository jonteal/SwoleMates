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
        <div className="w-1/3 h-1/2 loginCard">
        <h2 className="text-3x1 font-bold mb-10 text-center font-fa loginTitle">
            PROFILE
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              First Name:
              <input
                className="bg-gray-700  border-1 border-black"
                type="text"
                name="firstName"
                value={inputFirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                className="bg-gray-700  border-1 border-black"
                type="text"
                name="lastName"
                value={inputLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Age:
              <input
                className="bg-gray-700  border-1 border-black"
                type="number"
                min="0"
                max="120"
                name="age"
                value={inputAge}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <br />
            <label>
              Weight:
              <input
                className="bg-gray-700  border-1 border-black"
                type="number"
                min="0"
                name="weight"
                value={inputWeight}
                onChange={(e) => setWeight(e.target.value)}
              />{" "}
              lbs
            </label>
            <br />
            <label>
              Height:
              <input
                className="bg-gray-700  border-1 border-black"
                type="number"
                min="1"
                max="8"
                name="feet"
                value={inputFeet}
                onChange={(e) => setFeet(e.target.value)}
              />{" "}
              feet
              <input
                className="bg-gray-700  border-1 border-black"
                type="number"
                min="0"
                max="11"
                name="inches"
                value={inputInches}
                onChange={(e) => setInches(e.target.value)}
              />{" "}
              inches
            </label>
            <br />
            Birth Sex:
            <select value={inputSex} onChange={(e) => setSex(e.target.value)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <br />
            Exercise:
            <select
            className="bg-gray-700  border-1 border-black"
              value={inputActive}
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="1.2"> Sedentary (little to no exercise)</option>
              <option value="1.375">
                Lightly Active (light exercise/sports 1-3 days/week)
              </option>
              <option selected value="1.55">
                Moderately Active (moderate exercise/sports 3-5 days/week)
              </option>
              <option value="1.725">
                Very Active (hard exercise/sports 6-7 days a week)
              </option>
              <option value="1.9">
                Extra Active (very hard exercise/sports & physical job or 2x
                training)
              </option>
            </select>
            Goal:
            <select 
            className="bg-gray-700  border-1 border-black"
            value={inputGoal} onChange={(e) => setGoal(e.target.value)
            }>
              <option value="gain">Gain muscle</option>
              <option value="lose">Lose fat</option>
              <option selected value="maintain">
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