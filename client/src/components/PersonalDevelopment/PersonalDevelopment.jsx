import React, { useState, useEffect } from 'react';
import "./personalDevelopment.css";
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from "../../utils/queries";
//update goal?
const PersonalDevelopment = () => {

  const { data } = useQuery(GET_PROFILE);


  return (
    <div className="dev-container">
      <h2 className="goalHeader">Goal:</h2>
      <p className="currentGoal">Your current goal is to {data?.getUser.goal} weight.</p>
    </div>
  );
};

export default PersonalDevelopment;
