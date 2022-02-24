import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { QUERY_EXERCISES } from "../../utils/queries";
import { ADD_WORKOUT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./tracker.css";
import Shoes from "../../media/shoes.jpg";
import Yoga from "../../media/yoga.jpg";
import Weights from "../../media/weights.jpg";


// import { GET_WORKOUT } from "../../utils/mutations";

const Workout = () => {

  // date to find exercises to display;
  // import all exercises here (for the day)
  // useQuery to pull the data;
  // calculate calories

  const { loading, data } = useQuery(QUERY_EXERCISES);
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [id, setID] = useState(Math.floor(Math.random() * 10000000));
  const [caloriesBurnt, setCaloriesBurnt] = useState("");

  const allExercises =
    data?.allExercises.filter((exercise) => exercise.date === date) || [];

  useEffect(() => {
    setCaloriesBurnt(
      Math.round(
        allExercises
          .map((exercise) => exercise.caloriesBurnt)
          .reduce((a, b) => a + b, 0)
      )
    );
  });

  // submit your workout for the day OR update it if it exists;
  const handleSubmit = async (event) => {
    const calories = allExercises.map((exercise) => exercise.caloriesBurnt);
    const totalCalories = Math.round(calories.reduce((a, b) => a + b, 0));
    event.preventDefault();
    try {
      console.log(caloriesBurnt);

      const { data } = await addWorkout({
        // Execute mutation and pass in defined parameter data as variables
        variables: {
          id,
          date,
          routine: allExercises.map(({ _id }) => _id),
          caloriesBurnt,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // calories burnt suppose to include user weight; (13.5*3.5*weightInKG)

  return (
    <div>
      {allExercises.map((exercise) => (
        <ul className="workoutContainer">
          {exercise.type === "cardio" && (
            <div key={exercise._id} className="cardioCard">
              <div className="cardLeft">
                <img src={Shoes} alt="cardio" className="workoutImg" />
              </div>
              <div className="cardRight">
                <p className="workoutTitle">Cardio Training</p>
                <p>Date logged: {exercise.date}</p>
                <p>Duration: {exercise.durationInMinutes} minutes</p>
                <p>Distance: {exercise.cardioDistanceInMiles} miles</p>
                <p>Calories burnt: {exercise.caloriesBurnt} kcal </p>
              </div>
            </div>
          )}

          {exercise.type === "strength" && (
            <div key={exercise._id} className="strengthCard">
              <div className="cardLeft">
                <img src={Weights} alt="strength" className="workoutImg" />
              </div>
              <div className="cardRight">
                <p className="workoutTitle">Strength Training</p>
                <p>Date logged: {exercise.date}</p>
                <p>Total Reps: {exercise.repetitions} reps</p>
                <p>Sets: {exercise.sets} sets</p>
                <p>Weight used: {exercise.weight} lbs</p>
              </div>
            </div>
          )}

          {exercise.type === "stretching" && (

            <div key={exercise._id} className="stretchCard">
              <div className="cardLeft">
                <img src={Yoga} alt="stretch" className="workoutImg" />
              </div>

              <div className="cardRight">
                <p className="workoutTitle">Stretching</p>
                <p>Date logged: {exercise.date}</p>
                <p>Duration: {exercise.durationInMinutes} minutes</p>
                <p>Calories burnt: {exercise.caloriesBurnt} kcal </p>
              </div>
            </div>
          )}
        </ul>
      ))}

      <button onClick={(e) => handleSubmit(e)}>
        "Save and update workout on the dashboard"
      </button>
    </div>
  );
};

export default Workout;
