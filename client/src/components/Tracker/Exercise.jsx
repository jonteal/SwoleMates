import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
  ADD_CARDIO,
  ADD_STRENGTH,
  ADD_STRETCHING,
} from "../../utils/mutations";

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
  const [addStrength, {}] = useMutation(ADD_STRENGTH);
  const [addStretching, {}] = useMutation(ADD_STRETCHING);

  function handleSelect(event) {
    setType(event.target.value);
    setDate(currentDate);
    setID(ID);
    console.log(date);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(caloriesBurnt);

    if (type == "cardio") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Exercise duration: " +
          durationInMinutes +
          " minutes" +
          "\n " +
          "Distance of cardio: " +
          cardioDistanceInMiles +
          " miles" +
          "\n " +
          "\n " +
          "Check calories burnt on your dashboard!"
      );
      try {
        console.log("try?");
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
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Repetitions for weighted exercises: " +
          repetitions +
          " reps" +
          "\n " +
          "Number of sets: " +
          sets +
          " sets" +
          "\n " +
          "Used weights: " +
          weight +
          " lbs" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
      try {
        console.log("try?");
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
        console.log(data);
        console.log("Data where are u bish");
      } catch (err) {
        console.error(err);
      }
    }

    if (type == "stretching") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Exercise duration: " +
          durationInMinutes +
          "minutes" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
      try {
        console.log("try?");
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
        console.log(data);
        console.log("Data where are u bish");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      Please, enter your exercise details below!
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Select workout type:</label>
        <select value={type} onChange={handleSelect}>
          <option value="empty"></option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength training</option>
          <option value="stretching">Stretching</option>
        </select>

        <br />
        <div>
          {type == "cardio" ? (
            <div>
              <p>I am form cardio </p>
              <label>Exercise duration:</label>
              <input
                type="number"
                min="0"
                name="durationInMinutes"
                value={durationInMinutes}
                onChange={(e) => {
                  setDurationInMinutes(e.target.value);
                  setCaloriesBurnt((e.target.value * (13.5 * 3.5 * 70)) / 200);
                }}
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
              <p>I am form strength </p>
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
              <p>I am form stretching </p>
              <label>Exercise duration:</label>
              <input
                type="number"
                min="0"
                name="durationInMinutes"
                value={durationInMinutes}
                onChange={(e) => {
                  setDurationInMinutes(e.target.value);
                  setCaloriesBurnt((e.target.value * (3.5 * 3.5 * 70)) / 200);
                }}
              />
              minutes;
              <br />
              <input type="submit" value="Save" />
            </div>
          ) : null}
        </div>

        <br />
      </form>
    </>
  );
};
export default Exercise;
