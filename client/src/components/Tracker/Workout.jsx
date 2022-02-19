import React, { useState, useEffect } from "react";

import { useQuery } from '@apollo/client';

import { QUERY_EXERCISES } from '../../utils/queries';
import { ADD_WORKOUT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

// import { GET_WORKOUT } from "../../utils/mutations";

const Workout = () => {
// date to find exercises to display;
  
// import all exercises here (for the day)
// useQuery to pull the data;
// calculate calories 
const {loading, data} = useQuery(QUERY_EXERCISES);
const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
const [id, setID] = useState(Math.floor(Math.random() * 10000000));

const allExercises = data?.allExercises.filter((exercise) => exercise.date === date) || [];

const handleSubmit = async (event) =>{
  
  console.log(date)
  console.log(allExercises)
  

  // console.log(exercises[0]._id);
  
  event.preventDefault();
  try {
    
    console.log("try adding workout?");
    const { data } = await addWorkout({
      // Execute mutation and pass in defined parameter data as variables
      variables: {
        id,
        date,
        routine: allExercises.map(({_id}) => _id)
      },
    });
    console.log(data);
    
  } catch (err) {
    console.error(err);
  }
}



return (
  <div>
    <p>Testing exercise fetch: </p>
    <button 
           
            onClick={(e) => handleSubmit(e)}>Submit</button>
<div >
          {loading ? (
            <div>Loading...</div>
          ) : (
            allExercises.map((exercise =>(
            <div >
            <li>
             <p> Type of the exercise: {exercise.type} </p>
            </li>
          </div>
           ))
          ))}
        </div>
  </div>

);

}

export default Workout;