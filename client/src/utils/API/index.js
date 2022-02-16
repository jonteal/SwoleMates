const API = {
  fetchMealPlan: function (calories, hook) {
    let fetchMealPlanUrl = `https://api.spoonacular.com/mealplanner/generate${process.env.REACT_APP_API_KEY}&time=day&targetCalories=${calories}`;
    fetch(fetchMealPlanUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.week);
        console.log(data.week.length);
        hook(data.week);
      });
  },
};
export default API;
