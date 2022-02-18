import React, { useState, useEffect } from "react";
const API_KEY = "?apiKey=f8a19463536b4ffb8c05cdb882afb0c8";

const MealPlanner = () => {

  const [foodPlan, setPlan] = useState([]);

// cal is calculated based on our BMR;

  var calories = 2000

  useEffect(() => {
    fetchMealPlan(calories);
  }, []);

  const fetchMealPlan = (calories) => {
    let fetchMealPlanUrl = `https://api.spoonacular.com/mealplanner/generate${API_KEY}&time=day&targetCalories=${calories}`;
    fetch(fetchMealPlanUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.week)
        console.log(data.week.length)
        setPlan(data.week);
      });
  };
  
 
  
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
