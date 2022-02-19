import React, { useState, useEffect } from "react";

import { useQuery } from '@apollo/client';

import { QUERY_EXERCISES } from '../../utils/queries';
import { useMutation } from "@apollo/client";

// import { GET_WORKOUT } from "../../utils/mutations";

const Workout = () => {
  // date to find exercises to display;
  var currentDate = new Date().toISOString().split("T")[0];
// import all exercises here (for the day)
// useQuery to pull the data;
// calculate calories 
const {loading, data} = useQuery(QUERY_EXERCISES)

const exercises = data?.exercises || [];
console.log(exercises)
return (
  <div>
    <p>Testing exercise fetch: </p>
<div >
          {loading ? (
            <div>Loading...</div>
          ) : (
           exercises.map((exercise =>(
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