import React, { useState, useEffect } from "react";
import "./food.css";

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
  const [searchedTitle, setSearchedTitle] = useState("");

  const [recipes, setRecipes] = useState("");
  const [recipeCalories, setRecipeCalories] = useState("");
  const [recipeCarbs, setRecipeCarbs] = useState("");
  const [recipeFats, setRecipeFats] = useState("");
  const [recipeProteins, setRecipeProteins] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  // Set up info grab from the user - input line that saves value to our foodSearchItem;

  //   First API call to get food ID;
  const fetchFood = (foodItem) => {
    let fetchFoodUrl = `https://api.spoonacular.com/food/ingredients/search?${process.env.REACT_APP_API_KEY_SPOONACULAR}&query=${foodItem}&number=1`;

    fetch(fetchFoodUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results[0]) {
          setError(
            "Please check your spelling and try again."
          );
        } else {
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
        // setSearchedTitle(data.)
        setSearchedTitle(data.originalName);
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
      setFoodItem("");
    } catch (err) {
      window.location.assign("/food");
      console.log(err);
    }
  };

  const fetchRecipe = (foodItem) => {
    let fetchRecipeUrl = `https://api.spoonacular.com/recipes/autocomplete?query=${foodItem}&number=10&${process.env.REACT_APP_API_KEY_SPOONACULAR}`;

    fetch(fetchRecipeUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setError("Please check your spelling or enter a different recipe.");
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
        setRecipeCalories(data.nutrition.nutrients[0].amount);
        setRecipeCarbs(data.nutrition.nutrients[3].amount);
        setRecipeFats(data.nutrition.nutrients[1].amount);
        setRecipeProteins(data.nutrition.nutrients[8].amount);
        setRecipeUrl(data.sourceUrl);
        setRecipeTitle(data.title);
        setRecipeImg(data.image);
      });
  };

  function handleSubmitRecipe(e) {
    e.preventDefault();
    fetchRecipe(foodItem);
    setFoodItem("");
  }

  return (
    <div className="pt-5 foodBg">
      <div className="foodContainer">
        <h2 className="foodTitle">Log Food:</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="site__logo"
          width="56"
          height="84"
          viewBox="77.7 214.9 274.7 412"
        >
          <defs>
            <linearGradient id="a" x1="0%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#76D9F0" />
              <stop offset="100%" stopColor="#096479" />
            </linearGradient>
          </defs>
          <path
            fill="url(#a)"
            d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
          />
        </svg>

        <select
          className="border-black mb-1 mt-2 foodInputW"
          value={type}
          onChange={handleSelect}
        >
          <option selected value="" disabled selected>
            Food Search Options:
          </option>
          <option value="single">Single Item</option>
          <option value="recipe">Recipe</option>
        </select>

        {type == "single" ? (
          <div>
            <input
              className="border-black mb-1 foodInputW"
              type="text"
              name="foodItem"
              value={foodItem}
              placeholder="Insert food item"
              onChange={(e) => setFoodItem(e.target.value)}
              required
            />
            <br />
            <button className="foodBtn foodInputW" onClick={(e) => handleSubmit(e)}>
              Find info{" "}
            </button>
            <br />

            {error ? (
              <div>
                <p>{error}</p>
              </div>
            ) : foodSearch ? (
              <div>
                <p className="foodSubTitle">{searchedTitle}:</p>
                <div>
                  <div className="foodText">
                    <p> Calories: {foodCalories} kCal</p>
                    <p> Sugars: {foodSugars} g</p>
                    <p> Sodium: {foodSodium} g</p>
                    <p> Fat: {foodFat} g</p>
                    <p> Protein: {foodProtein} g</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : type == "recipe" ? (
          <div>
            <div className="foodCard">
            <input
              className="border-black mb-1 foodInputW"
              type="text"
              name="foodItem"
              value={foodItem}
              placeholder="Insert recipe"
              onChange={(e) => setFoodItem(e.target.value)}
              required
            />
            <button className="foodBtn foodInputW" onClick={(e) => handleSubmitRecipe(e)}>
              Find recipes!{" "}
            </button>
</div>
            {error ? (
              <div>
                <p>{error}</p>
              </div>
            ) : recipes ? (
              <div>
                <h3 className="foodSubTitle">Select a recipe:</h3>
                <br />
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipeContainer">
                    <button
                      className="recipeBtn"
                      onClick={() => fetchRecipeNutrients(recipe.id)}
                    >
                      • {recipe.title}
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            <br />

            <div>
              {recipeCalories ? (
                <div>
                  <a href={recipeUrl} target="_blank">
                  <h3 className="foodSubTitleRecipe">
                      {recipeTitle}
                  </h3>
                  <div className="foodImageContainer">
                    <img className="foodImage" src={recipeImg} alt={recipeTitle} />
                  </div>
                  </a>
                  <div className="foodText">
                    <p>Calories : {recipeCalories}</p>
                    <p>Fats : {recipeFats}</p>
                    <p>Carbs : {recipeCarbs}</p>
                    <p>Proteins : {recipeProteins}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FoodBar;
