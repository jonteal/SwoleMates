import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

import {
  ADD_CARDIO,
  ADD_STRENGTH,
  ADD_STRETCHING,
} from "../../utils/mutations";
import { GET_PROFILE } from "../../utils/queries";
import "./tracker.css";

const Exercise = (props) => {
  const [type, setType] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState("");
  const [cardioDistanceInMiles, setCardioDistanceInMiles] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [id, setID] = useState("");
  const [caloriesBurnt, setCaloriesBurnt] = useState("");

  // Current date:
  var currentDate = new Date().toISOString().split("T")[0];
  var ID = Math.floor(Math.random() * 10000000);

  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_EXERCISE mutation
  // const [addExercise, { error }] = useMutation(ADD_EXERCISE);
  const [addCardio, { error }] = useMutation(ADD_CARDIO);
  const [addStrength, { }] = useMutation(ADD_STRENGTH);
  const [addStretching, { }] = useMutation(ADD_STRETCHING);

  const { loading, _, data } = useQuery(GET_PROFILE);

  function handleSelect(event) {
    setType(event.target.value);
    setDate(currentDate);
    setID(ID);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(caloriesBurnt);

    if (type == "cardio") {
      try {
        const { data } = await addCardio({
          // Execute mutation and pass in defined parameter data as variables
          variables: {
            id,
            type,
            durationInMinutes,
            cardioDistanceInMiles,
            date,
            caloriesBurnt,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (type == "strength") {
      try {
        const { data } = await addStrength({
          // Execute mutation and pass in defined parameter data as variables
          variables: {
            id,
            type,
            repetitions,
            sets,
            weight,
            date,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (type == "stretching") {
      try {
        const { data } = await addStretching({
          // Execute mutation and pass in defined parameter data as variables
          variables: {
            id,
            type,
            durationInMinutes,
            date,
            caloriesBurnt
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="logBg">
        <div className="logContainer">
          <h2 className="logTitle">Log Workout:</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="site__logo"
            width="56"
            height="84"
            viewBox="77.7 214.9 274.7 412"
          >
            <defs>
              <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#76D9F0" />
                <stop offset="100%" stopColor="#096479" />
              </linearGradient>
            </defs>
            <path
              fill="url(#a)"
              d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
            />
          </svg>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
              window.location.assign('/exercise');
            }}
          >
            <select
              value={type}
              onChange={handleSelect}
              className="border-black mb-1 mt-2 w-full"
            >
              <option selected value="" disabled selected>
                Workout Type:
              </option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="stretching">Stretching</option>
            </select>

            <br />
            <div>
              {type == "cardio" ? (
                <div>
                  <input
                    className="border-black mb-1"
                    type="number"
                    min="0"
                    name="durationInMinutes"
                    value={durationInMinutes}
                    placeholder="Duration in minutes"
                    onChange={(e) => {
                      setDurationInMinutes(e.target.value);
                      setCaloriesBurnt((e.target.value * (13.5 * 3.5 * data?.getUser.weight)) / 200); //change the 70 to the weight
                    }}
                    required
                  />
                  <br />
                  <input
                    type="number"
                    className="border-black mb-1"
                    min="0"
                    name="cardioDistanceInMiles"
                    value={cardioDistanceInMiles}
                    placeholder="Total distance in miles"
                    onChange={(e) => setCardioDistanceInMiles(e.target.value)}
                    required
                  />
                  <br />

                  <input
                    className="logWorkoutBtn"
                    type="submit"
                    value="Save"
                  />

                </div>
              ) : type == "strength" ? (
                <div>
                  <input
                    className="border-black mb-1"
                    type="number"
                    min="0"
                    name="repetitions"
                    value={repetitions}
                    placeholder="Total Reps"
                    onChange={(e) => setRepetitions(e.target.value)}
                    required
                  />
                  <br />

                  <input
                    className="border-black mb-1"
                    type="number"
                    min="0"
                    name="sets"
                    value={sets}
                    placeholder="Total Sets"
                    onChange={(e) => setSets(e.target.value)}
                    required
                  />

                  <br />
                  <input
                    className="border-black mb-1"
                    type="number"
                    min="0"
                    name="weight"
                    value={weight}
                    placeholder="Weights in pounds"
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <br />
                  <input className="logWorkoutBtn" type="submit" value="Save" />
                </div>
              ) : type == "stretching" ? (
                <div>
                  <input
                    className="border-black mb-1"
                    type="number"
                    min="0"
                    name="durationInMinutes"
                    value={durationInMinutes}
                    placeholder="Duration in minutes"
                    onChange={(e) => {
                      setDurationInMinutes(e.target.value);
                      setCaloriesBurnt((e.target.value * (3.5 * 3.5 * data?.getUser.weight)) / 200); // change the 70 to user weight
                    }}
                    required
                  />
                  <br />
                  <input className="logWorkoutBtn" type="submit" value="Save" />
                </div>
              ) : null}

            </div>

            <br />
          </form>
        </div>
      </div>
    </>
  );
};
export default Exercise;
