import React, { useState, useEffect } from 'react';
import "./personalDevelopment.css";
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from "../../utils/queries";
//update goal?
const PersonalDevelopment = () => {
  // const { data, loading, error } = useQuery(GET_PROFILE);
  // console.log(data)

  const { data } = useQuery(GET_PROFILE);


  return (
    <div className="dev-container filter drop-shadow-lg">
      <h2>Goal:</h2>
      <p>Your current is to {data?.getUser.goal} weight.</p>
    </div>
  );
};

export default PersonalDevelopment;
