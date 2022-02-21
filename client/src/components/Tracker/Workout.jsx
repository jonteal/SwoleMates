import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { QUERY_EXERCISES } from "../../utils/queries";
import { ADD_WORKOUT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

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

  const allExercises =
    data?.allExercises.filter((exercise) => exercise.date === date) || [];



  // submit your workout for the day OR update it if it exists;
  const handleSubmit = async (event) => {
  
 
    event.preventDefault();
    try {
      const { data } = await addWorkout({
        // Execute mutation and pass in defined parameter data as variables
        variables: {
          id,
          date,
          routine: allExercises.map(({ _id }) => _id),
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
      <p> Hello! </p>
      <br></br>
      {allExercises.map((exercise) => (
        <ul>

          {exercise.type === "cardio" && (
            <div key={exercise._id}>
              <p>Exercise type is: {exercise.type} </p>
              <br></br>
              <p>Duration: {exercise.durationInMinutes} minutes;</p>
              <p>Distance: {exercise.cardioDistanceInMiles} miles;</p>
              <p>Calories burnt: {exercise.durationInMinutes*(13.5*3.5*70)/200} kcal; </p>
              <br></br>
            </div>
          )}

          {exercise.type === "strength" && (
            <div key={exercise._id}>
              <p>Exercise type is: {exercise.type} </p>
              <br></br>
              <p>Repetitions made: {exercise.repetitions} reps;</p>
              <p>Sets: {exercise.sets} sets;</p>
              <p>Weight used: {exercise.weight} lbs;</p>
              
              <br></br>
            </div>
          )}

          {exercise.type === "stretching" && (
            <div key={exercise._id}>
              <p>Exercise type is: {exercise.type} </p>
              <br></br>
              <p>Duration: {exercise.durationInMinutes} minutes;</p>
              <p>Calories burnt: {exercise.durationInMinutes*(3.5*3.5*70)/200} kcal; </p>
              <br></br>
            </div>
          )}
        </ul>
      ))}

      <button onClick={(e) => handleSubmit(e)}>"Save and update workout on the dashboard"</button>
    </div>
  );
};

export default Workout;
