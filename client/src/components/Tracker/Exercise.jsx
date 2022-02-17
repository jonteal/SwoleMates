import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

// import { ADD_EXERCISE } from "../../utils/actions";

const Exercise = (props) => {
  const [type, setType] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState("");
  const [cardioDistanceInMiles, setCardioDistanceInMiles] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");

  const [selectedType, setSelectedType] = useState([]);

  function handleSelect(event) {
    setType(event.target.value);
  }

  function handleSubmit(event) {
    if (type == "cardio") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Exercise duration: " +
          durationInMinutes +
          " minutes" +
          "\n " +
          "Distance of cardio: " +
          cardioDistanceInMiles +
          " miles" +
          "\n " +
          "\n " +
          "Check calories burnt on your dashboard!"
      );
    }
    if (type == "strength") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Repetitions for weighted exercises: " +
          repetitions +
          " reps" +
          "\n " +
          "Number of sets: " +
          sets +
          " sets" +
          "\n " +
          "Used weights: " +
          weight +
          " lbs" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
    }

    if (type == "stretching") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          type +
          ";" +
          "\n " +
          "\n " +
          "Exercise duration: " +
          durationInMinutes +
          "minutes" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
      event.preventDefault();
    }

    // 3)fron end side of mut

    // ADD USE MUTATION HERE;

    return (
      <>
        Please, enter your exercise details below!
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label>Select workout type:</label>
          <select value={type} onChange={setType}>
            <option value="empty"></option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength training</option>
            <option value="stretching">Stretching</option>
          </select>

          <br />
          <div>
            {type == "cardio" ? (
              <div>
                <p>I am form cardio </p>
                <label>Exercise duration:</label>
                <input
                  type="number"
                  min="0"
                  name="durationInMinutes"
                  value={durationInMinutes}
                  onChange={(e) => setDurationInMinutes(e.target.value)}
                />
                minutes;
                <br />
                <label>Distance of cardio:</label>
                <input
                  type="number"
                  min="0"
                  name="cardioDistanceInMiles"
                  value={cardioDistanceInMiles}
                  onChange={(e) => setCardioDistanceInMiles(e.target.value)}
                />
                miles;
                <br />
                <input type="submit" value="Save" />
              </div>
            ) : type == "strength" ? (
              <div>
                <p>I am form strength </p>
                <label>Repetitions for weighted exercises:</label>
                <input
                  type="number"
                  min="0"
                  name="repetitions"
                  value={repetitions}
                  onChange={(e) => setRepetitions(e.target.value)}
                />
                reps;
                <br />
                <label>Number of sets:</label>
                <input
                  type="number"
                  min="0"
                  name="sets"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
                sets;
                <br />
                <label>Used weights:</label>
                <input
                  type="number"
                  min="0"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                lbs;
                <br />
                <input type="submit" value="Save" />
              </div>
            ) : type == "stretching" ? (
              <div>
                <p>I am form stretching </p>
                <label>Exercise duration:</label>
                <input
                  type="number"
                  min="0"
                  name="durationInMinutes"
                  value={durationInMinutes}
                  onChange={(e) => setDurationInMinutes(e.target.value)}
                />
                minutes;
                <br />
                <input type="submit" value="Save" />
              </div>
            ) : null}
          </div>

          <br />
        </form>
      </>
    );
  }
};

export default Exercise;
