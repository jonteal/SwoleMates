
import React, { useState, useEffect } from 'react';
const API_KEY = "?apiKey=f8a19463536b4ffb8c05cdb882afb0c8";


const FoodBar = () => {
    const [foodID, setFood] = useState({});
    const [foodCalories, setCalories] = useState("");

    var foodSearchItem = "banana";

    useEffect(() => {
        fetchFood("banana");
    }, []);

    useEffect(() => {
        fetchNutrients(foodID)
    }, [foodID]);

    const fetchFood = (foodSearchItem) => {
        let fetchFoodUrl = `https://api.spoonacular.com/food/ingredients/search${API_KEY}&query=${foodSearchItem}&number=1`;
        fetch(fetchFoodUrl).then(res => res.json()).then(data =>{
            setFood(data.results[0].id);
        });
    } 
    
    const fetchNutrients = (foodID) => {
        let fetchFoodUrl = `https://api.spoonacular.com/food/ingredients/${foodID}/information?amount=1&apiKey=f8a19463536b4ffb8c05cdb882afb0c8`;
        fetch(fetchFoodUrl).then(res => res.json()).then(data =>{
            console.log(data.nutrition.nutrients[17].amount);
            setCalories(data.nutrition.nutrients[17].amount);
        });
    }


    


  

  return (
    <div  className="foodItem">
        <p>Here some information about a {foodSearchItem}</p>
      <div>
         <div className="foodbar-text">
          <h2> We have that many cal: {foodCalories}</h2>
        </div>
      </div>

    </div>
  );
}

export default FoodBar;