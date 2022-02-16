import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const MealPlanner = () => {
  const [foodMonday, setMonday] = useState("");
  const [foodTuesday, setTuesday] = useState("");
  const [foodWednesday, setWednesday] = useState("");
  const [foodThursday, setThursday] = useState("");
  const [foodFriday, setFriday] = useState("");
  const [foodSaturday, setSaturday] = useState("");
  const [foodSunday, setSunday] = useState("");

  const [foodPlan, setPlan] = useState([]);

// cal is calculated based on our BMR;

  let calories = 2000

  useEffect(() => {
    
    API.fetchMealPlan(calories, setPlan);
  }, []);
   
  return (
    <div className="">
      <p>Meal planner for the week! </p>
      <div>
     { Object.keys(foodPlan).map((key, index) => (
         <>
          <h1>{key}</h1>
          <ul>
              {foodPlan[key].meals.map(meal => (
                  <li>{meal.title}</li>
              ))}
          </ul>
         </>
     ))}
      </div>
    </div>
  );
};

export default MealPlanner;
