import React, { useState, useEffect } from "react";

const FoodBar = () => {
  // Setting up states to later use fetched data;
  const [error, setError] = useState("");
  const [foodCalories, setCalories] = useState("");
  const [foodSugars, setSugars] = useState("");
  const [foodProtein, setProtein] = useState("");
  const [foodFat, setFat] = useState("");
  const [foodSodium, setSodium] = useState("");
  const [type, setType] = useState("");

  const [foodItem, setFoodItem] = useState("");
  const [foodSearch, setFoodSearch] = useState("");

  const [recipes, setRecipes] = useState("");
  const [recipeCalories, setRecipeCalories] = useState("");
  const [recipeCarbs, setRecipeCarbs] = useState("");
  const [recipeFats, setRecipeFats] = useState("");
  const [recipeProteins, setRecipeProteins] = useState("");
  // Set up info grab from the user - input line that saves value to our foodSearchItem;

  //   First API call to get food ID;
  const fetchFood = (foodItem) => {
    let fetchFoodUrl = `https://api.spoonacular.com/food/ingredients/search?${process.env.REACT_APP_API_KEY_SPOONACULAR}&query=${foodItem}&number=1`;

    fetch(fetchFoodUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results[0]) {
          setError(
            "Please, check your spelling and enter an actual food item! "
          );
          console.log("enter  legit item pls");
        } else {
          console.log("else" + data.results[0].id);
          setError("");
          fetchNutrients(data.results[0].id);
        }
      });
  };

  // Second API call to get food by ID and its nutrients;
  const fetchNutrients = (foodID) => {
    let fetchFoodUrl = `https://api.spoonacular.com/food/ingredients/${foodID}/information?amount=1&${process.env.REACT_APP_API_KEY_SPOONACULAR}`;
    fetch(fetchFoodUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCalories(data.nutrition.nutrients[17].amount);
        setSugars(data.nutrition.nutrients[19].amount);
        setProtein(data.nutrition.nutrients[31].amount);
        setFat(data.nutrition.nutrients[1].amount);
        setSodium(data.nutrition.nutrients[3].amount);
      });
  };

  function handleSelect(event) {
    setType(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFoodSearch(foodItem);
      fetchFood(foodItem);
    } catch (err) {
      window.location.assign("/food");
      console.log(err);
    }
  };

  const fetchRecipe = (foodItem) => {
    let fetchRecipeUrl = `https://api.spoonacular.com/recipes/autocomplete?query=${foodItem}&number=10&${process.env.REACT_APP_API_KEY_SPOONACULAR}`;
    // https://api.spoonacular.com/recipes/autocomplete?query=burger&number=10&apiKey=f8a19463536b4ffb8c05cdb882afb0c8
    console.log(foodItem);
    fetch(fetchRecipeUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setError("Please, check your spelling or enter different recipe");
          console.log("enter  legit recipe pls");
        } else {
          setRecipes(data);
          setError("");
        }
      });
  };

  const fetchRecipeNutrients = (recipeID) => {
    let fetchFoodUrl = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=true&${process.env.REACT_APP_API_KEY_SPOONACULAR}`;

    fetch(fetchFoodUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipeCalories(data.nutrition.nutrients[0].amount);
        setRecipeCarbs(data.nutrition.nutrients[3].amount);
        setRecipeFats(data.nutrition.nutrients[1].amount);
        setRecipeProteins(data.nutrition.nutrients[8].amount);
      });
  };

  function handleSubmitRecipe(e) {
    e.preventDefault();
    fetchRecipe(foodItem);
  }

  return (
    <div>
      <label>Select search option</label>
      <select value={type} onChange={handleSelect}>
        <option value="empty"></option>
        <option value="single">Single Item</option>
        <option value="recipe">Recipe</option>
      </select>

      <br />
      {type == "single" ? (
        <div className="foodItem">
          <label>Type a food item to search for nutrition information </label>
          <input
            type="text"
            name="foodItem"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <br />
          <button onClick={(e) => handleSubmit(e)}>Find info </button>
          <br />

          {error ? (
            <div>
              <p>{error}</p>
            </div>
          ) : foodSearch ? (
            <div>
              <p>Here some information about a {foodItem}</p>
              <div>
                <div className="foodbar-text">
                  <h2> Amount of calories in the food item: {foodCalories}</h2>
                  <h2>Here is some more info about nutrients for : </h2>

                  <br />
                  <h2> Sugars: {foodSugars} </h2>
                  <h2> Sodium: {foodSodium}</h2>
                  <h2> Fat: {foodFat}</h2>
                  <h2> Protein: {foodProtein} </h2>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : type == "recipe" ? (
        <div className="foodItem">
          <label>Type recipe query </label>
          <input
            type="text"
            name="foodItem"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <br />
          <button onClick={(e) => handleSubmitRecipe(e)}>Find recipes! </button>
          <br />

          <br />
          {error ? (
            <div>
              <p>{error}</p>
            </div>
          ) : recipes ? (
            <div>
              <p>Click on the recipe to render some more information!</p>
              <br />
              {recipes.map((recipe) => (
                <div key={recipe.id}>
                  <button onClick={() => fetchRecipeNutrients(recipe.id)}>
                    - {recipe.title}
                  </button>
                  <br />
                </div>
              ))}
            </div>
          ) : null}
          <br />
         
          <div>
          {recipeCalories ? <div> 
            <p>Nutrition per serving:</p>
            <br />
            <p>Calories : {recipeCalories}</p>
            <p>Fats : {recipeFats}</p>
            <p>Carbs : {recipeCarbs}</p>
            <p>Proteins : {recipeProteins}</p>
            </div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FoodBar;
