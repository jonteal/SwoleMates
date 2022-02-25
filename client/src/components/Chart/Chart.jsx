import React, { useState, useEffect } from "react";

// This import is nesseccary to make all the graphs datasets work properly;
import Chart from "chart.js/auto";

// press control+space in an empty {} import to see options of graphs;
import { Bar } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../../utils/queries";

const BarChart = () => {
  const [chart, setChart] = useState("");
  const [button, setButton] = useState("Generate Chart");

//   setting up states for graphs data;
  const [workoutDates, setWorkoutDates] = useState({});
  const [workoutCalories, setWorkoutCalories] = useState({});

//   getting all the workout data from the db;
  const { loading, data } = useQuery(QUERY_WORKOUTS);

//   mapping dates and calories;
  const allWorkoutDates = data?.allWorkouts.map((workout) => workout.date);
  const allWorkoutCalories = data?.allWorkouts.map(
    (workout) => workout.caloriesBurnt
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!chart) {
      setChart("Ready");
      setButton("Close Chart");
      setWorkoutDates(allWorkoutDates);
      setWorkoutCalories(allWorkoutCalories);
    } else {
      setChart("");
      setButton("Generate Chart");
    }
  };

  return (
    <div>
    {/* // button to show\hide graph */}
      <br />
      <button onClick={(e) => handleSubmit(e)}>{button} </button>
      <br />
      <div>
        {chart === "Ready" ? (
            // Bar component is a type of Graph imported from "react-chartjs-2"
          <Bar
            data={{
              labels: workoutDates,
              datasets: [
                {
                  label: "Calories burnt",
                  data: workoutCalories,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            }}
            height={"100vh"}
            width={null}
            options={{
              maintainAspectRatio: false,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BarChart;
