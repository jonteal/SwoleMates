import React, { useState, useEffect } from "react";


const Workout = () => {

    const [workoutData, setWorkoutData] = useState({
        type: "",
        durationInMinutes: "",
        cardioDistanceInMiles: "",
        repetitions: "",
        sets: "",
        weight: "",
        caloriesBurnt: "",
      });

    //   write a mutation with workout add
      const [createWorkout, { data, error }] = useMutation(ADD_WORKOUT);


      const handleInputChange = (event) => {
        const { type, durationInMinutes, cardioDistanceInMiles, repetitions, sets, weight, caloriesBurtn, value } = event.target;
        setWorkoutData({ ...workoutData, [type]: value, [durationInMinutes]: value, [cardioDistanceInMiles]: value, [repetitions]: value, [sets]: value, [weight]: value, [caloriesBurnt]: value });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const { data } = await createWorkout({
            variables: { ...workoutData },
          });
    
        } catch (err) {
          console.error(err);
        }
    
        setWorkoutFormData({
            type: "",
            durationInMinutes: "",
            cardioDistanceInMiles: "",
            repetitions: "",
            sets: "",
            weight: "",
            caloriesBurnt: "",
        });
      };

    return (
      <div className="">
        <p>Enter your workout information here:</p>
        <div>
          <div className="">
            <h2> We have that many cal: {foodCalories}</h2>
            <h2>Here is some more info about nutriens for : </h2>
  
            <br />
  
            <h2> Sugars: {foodSugars} </h2>
            <h2> Sodium: {foodSodium}</h2>
            <h2> Fat: {foodFat}</h2>
            <h2> Protein: {foodProtein} </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default Workout;