import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
// import { ADD_EXERCISE } from "../../utils/mutations";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      durationInMinutes: "",
      cardioDistanceInMiles: "",
      repetitions: "",
      sets: "",
      weight: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.setState({ type: event.target.value });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    if (this.state.type == "cardio") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          this.state.type +
          ";" +
          "\n " +
          "Exercise duration: " +
          this.state.durationInMinutes +
          " minutes" +
          "\n " +
          "Distance of cardio: " +
          this.state.cardioDistanceInMiles +
          " miles" +
          "\n " +
          "\n " +
          "Check calories burnt on your dashboard!"
      );
    }
    if (this.state.type == "strength") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          this.state.type +
          ";" +
          "\n " +
          "Repetitions for weighted exercises: " +
          this.state.repetitions +
          " reps" +
          "\n " +
          "Number of sets: " +
          this.state.sets +
          " sets" +
          "\n " +
          "Used weights: " +
          this.state.weight +
          " lbs" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
    }

    if (this.state.type == "stretching") {
      alert(
        "Your exercise was submitted! \n" +
          "\n " +
          "Exercise type: " +
          this.state.type +
          ";" +
          "\n " +
          "Exercise duration: " +
          this.state.durationInMinutes +
          "minutes" +
          "\n " +
          "\n " +
          "Check out your dashboard!"
      );
    }

    event.preventDefault();
  }

  render() {
    return (
      <>
        Please, enter your exercise detail!
        <form onSubmit={this.handleSubmit}>
          <label>
            Select workout type:
            <select value={this.state.type} onChange={this.handleSelect}>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength training</option>
              <option value="stretching">Stretching</option>
            </select>
          </label>
          <br />
          <div>
            {this.state.type == "cardio" ? (
              <div>
                {" "}
                <p>I am form cardio </p>
                <label>
                  Exercise duration:
                  <input
                    type="number"
                    min="0"
                    name="durationInMinutes"
                    value={this.state.durationInMinutes}
                    onChange={this.handleInputChange}
                  />{" "}
                  minutes;
                </label>
                <br />
                <label>
                  Distance of cardio:
                  <input
                    type="number"
                    min="0"
                    name="cardioDistanceInMiles"
                    value={this.state.cardioDistanceInMiles}
                    onChange={this.handleInputChange}
                  />{" "}
                  miles;
                </label>
              </div>
            ) : this.state.type == "strength" ? (
              <div>
                <p>I am form strength </p>

                <label>
                  Repetitions for weighted exercises:
                  <input
                    type="number"
                    min="0"
                    name="repetitions"
                    value={this.state.repetitions}
                    onChange={this.handleInputChange}
                  />{" "}
                  reps;
                </label>

                <br />

                <label>
                  Number of sets:
                  <input
                    type="number"
                    min="0"
                    name="sets"
                    value={this.state.sets}
                    onChange={this.handleInputChange}
                  />{" "}
                  sets;
                </label>

                <br />

                <label>
                  Used weights:
                  <input
                    type="number"
                    min="0"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleInputChange}
                  />{" "}
                  lbs;
                </label>
              </div>
            ) : this.state.type == "stretching" ? (
              <div>
                {" "}
                <p>I am form stretching </p>
                <label>
                  Exercise duration:
                  <input
                    type="number"
                    min="0"
                    name="durationInMinutes"
                    value={this.state.durationInMinutes}
                    onChange={this.handleInputChange}
                  />{" "}
                  minutes;
                </label>
                <br />
              </div>
            ) : null}
          </div>

          <br />

          <input type="submit" value="Save" />
        </form>
      </>
    );
  }
}

export default Exercise;
