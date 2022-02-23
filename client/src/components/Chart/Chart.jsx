import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
// press control+space in an empty {} import to see options;
import { Bar } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../../utils/queries";

const BarChart = () => {
  const [chart, setChart] = useState("");
  const [button, setButton] = useState("Generate Chart");

  const [workoutDates, setWorkoutDates] = useState({});

  const { loading, data } = useQuery(QUERY_WORKOUTS);

  const allWorkouts = data?.allWorkouts.map((workout) => workout.date);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!chart) {
      setChart("Ready");
      setButton("Close Chart");
      setWorkoutDates(allWorkouts);
      console.log(allWorkouts);
    } else {
      setChart("");
      setButton("Generate Chart");
    }
  };

  return (
    <div>
      <br />
      <button onClick={(e) => handleSubmit(e)}>{button} </button>
      <br />
      <div>
        {chart === "Ready" ? (
          <Bar
            data={{
              labels: workoutDates,
              datasets: [
                {
                  label: "Calories burnt",
                  data: [12, 19, 3, 5, 2, 3],
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
            height={400}
            width={600}
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
