import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
  ADD_CARDIO,
  ADD_STRENGTH,
  ADD_STRETCHING,
} from "../../utils/mutations";

import './tracker.css'

const Exercise = (props) => {
  const [type, setType] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState("");
  const [cardioDistanceInMiles, setCardioDistanceInMiles] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [id, setID] = useState("");

  // Current date:
  var currentDate = new Date().toISOString().split("T")[0];
  var ID = Math.floor(Math.random() * 10000000);

  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_EXERCISE mutation
  // const [addExercise, { error }] = useMutation(ADD_EXERCISE);
   const [addCardio, { error }] = useMutation(ADD_CARDIO);
  const [addStrength, {  }] = useMutation(ADD_STRENGTH);
  const [addStretching, {  }] = useMutation(ADD_STRETCHING);

  function handleSelect(event) {
    setType(event.target.value);
    setDate(currentDate);
    setID(ID);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (type == "cardio") {
      try {
        const { data } = await addCardio({
          // Execute mutation and pass in defined parameter data as variables
          variables: {
            id,
            type,
            durationInMinutes,
            cardioDistanceInMiles,
            date
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
            date
            // date,
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
            date

            // date,
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
      Log Workout Below:
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Select workout type:</label>
        <select value={type} onChange={handleSelect}>
          <option value="empty"></option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="stretching">Stretching</option>
        </select>

        <br />
        <div>
          {type == "cardio" ? (
            <div>
              <p>Logging a cardio workout </p>
              <label>Exercise duration:</label>
              <input
                type="number"
                min="0"
                name="durationInMinutes"
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(e.target.value)}
              />
              minutes;
              <br />
              <label>Distance of cardio:</label>
              <input
                type="number"
                min="0"
                name="cardioDistanceInMiles"
                value={cardioDistanceInMiles}
                onChange={(e) => setCardioDistanceInMiles(e.target.value)}
              />
              miles;
              <br />
              <input type="submit" value="Save" />
            </div>
          ) : type == "strength" ? (
            <div>
              <p>Logging a strength workout </p>
              <label>Repetitions for weighted exercises:</label>
              <input
                type="number"
                min="0"
                name="repetitions"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
              />
              reps;
              <br />
              <label>Number of sets:</label>
              <input
                type="number"
                min="0"
                name="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
              sets;
              <br />
              <label>Used weights:</label>
              <input
                type="number"
                min="0"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              lbs;
              <br />
              <input type="submit" value="Save" />
            </div>
          ) : type == "stretching" ? (
            <div>
              <p>Logging a stretch session </p>
              <label>Exercise duration:</label>
              <input
                type="number"
                min="0"
                name="durationInMinutes"
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(e.target.value)}
              />
              minutes;
              <br />
              <input type="submit" value="Save" />
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
