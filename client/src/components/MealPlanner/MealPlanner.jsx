import React, { useState, useEffect } from "react";
import "./mealplanner.css";

const MealPlanner = () => {
  //   Setting up a state to save fetched data:
  const [foodPlan, setPlan] = useState([]);

  //   Calories are calculated based on our BMR;
  let calories = 2000;

  //   Initiating data fetch from Spunacular API:
  useEffect(() => {
    fetchMealPlan(calories);
  }, []);

  //   Data fetch:
  const fetchMealPlan = (calories) => {
    let fetchMealPlanUrl = `https://api.spoonacular.com/mealplanner/generate?${process.env.REACT_APP_API_KEY_SPOONACULAR}&time=day&targetCalories=${calories}`;
    fetch(fetchMealPlanUrl)
      .then((res) => res.json())
      .then((data) => {
        setPlan(data.week);
      });
  };

  return (
    <div className="mealContainer">
      <p className="mealPlanTitle">Weekly Recipes </p>
      <div className="mealCalendar">
        {Object.keys(foodPlan).map((key, index) => (
          <>
            <div className="mealDay">
              <h1 className="innerDay" key={key}>
                {key}:
              </h1>

              {foodPlan[key].meals.map((meal) => (
                <a href={meal.sourceUrl} target="_blank" className="getMeal">
                <div className="mealRecipes" key={meal.sourceUrl.id}>
                  <h2 className="mealName">{meal.title}</h2>
                  <p>Servings: {meal.servings}</p>
                  <p>Time: {meal.readyInMinutes} min</p>
                    <p>Click for recipe</p>
                </div>
                </a>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
