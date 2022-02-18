import React, { useState, useEffect } from "react";

const MealPlanner = () => {

  //   Setting up a state to save fetched data:
  const [foodPlan, setPlan] = useState([]);

  //   Calories are calculated based on our BMR;
  var calories = 2000;

  //   Initiating data fetch from Spunacular API:
  useEffect(() => {
    fetchMealPlan(calories);
  }, []);

  //   Data fetch:
  const fetchMealPlan = (calories) => {
    let fetchMealPlanUrl = `https://api.spoonacular.com/mealplanner/generate${process.env.REACT_APP_API_KEY}&time=day&targetCalories=${calories}`;
    fetch(fetchMealPlanUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.week);
        // console.log(data.week.length);
        // console.log(data.week.monday.meals[0].sourceUrl);
        setPlan(data.week);
      });
  };

  return (
    <div className="">
      <p>Meal planner for the week! </p>
      <p>Just click to get the recipe.</p>
      <div>
        {Object.keys(foodPlan).map((key, index) => (
          <>
            <div>
              <br />
              <h1 key={key}>Meals for {key}:</h1>
              <br />
            </div>
            <ul>
              {foodPlan[key].meals.map((meal) => (
                <div key={meal.sourceUrl.id}>
                  <li>
                    <a href={meal.sourceUrl} target="_blank">
                      - {meal.title};
                    </a>
                  </li>
                </div>
              ))}
            </ul>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
