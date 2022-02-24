import React, { useState, useEffect, Component } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE } from "../../utils/queries";
import { UPDATE_WEIGHT } from "../../utils/mutations";
import "./weight.css";

const Weight = () => {
  const [form, setForm] = useState(false);
  const showForm = () => setForm(!form);

  const [updateWeight, { error }] = useMutation(UPDATE_WEIGHT);
  let { loading, _, data } = useQuery(GET_PROFILE);
  const [currentWeight, setWeight] = useState(0);

  let displayWeight

  if (currentWeight == 0) {
    console.log(data);
    displayWeight = <div className="current-weight">{data?.getUser.weight} lbs</div>
  } else {
    displayWeight = <div className="current-weight">{currentWeight} lbs</div>
  }


  //will write to database and then will see if it will update on the front end
  const handleSubmit = async (event) => {
    event.preventDefault();
    const db_update = await updateWeight({
      variables: { weight: currentWeight },
    });
    console.log(db_update.data.updateWeight.weight);
    setWeight(db_update.data.updateWeight.weight)
    setForm(!form);
    return db_update;
  };

  return (
    <>
      {!form ? (

          <div className="weightCard">
            <h1 className="weightHeader">Current Weight</h1>

            <h2 className="currentWeight">{displayWeight}</h2>
            <button
              onClick={showForm}
              className="weightBtn"
              type="button"
              variant="success"
            >
              Update
            </button>
          </div>

      ) : (
        <div className="weight-container">
          <div className="weight-card">
            <h1 className="weight-header">Add Weight Here</h1>
            <form className="weight-form" onSubmit={handleSubmit}>
              <input
                className="weight-input"
                type="number"
                placeholder="200 lbs"
                name="weight"
                onChange={(e) => {
                  setWeight(parseFloat(e.target.value));
                }}
                required
              />
              <button
                className="weightBtn"
                type="submit"
                variant="success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Weight;
