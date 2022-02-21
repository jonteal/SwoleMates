import React, { useState } from "react";
import "./personalDevelopment.css";
// import { useQuery } from '@apollo/client';
// import {GET_WEIGHT} from '../../utils/queries'

const PersonalDevelopment = () => {
  // const { data, loading, error } = useQuery(GET_WEIGHT);
  // console.log(data)

  return (
    <div className="dev-container filter drop-shadow-lg">
      <h2>Goal:</h2>
      <p>Your current is to  weight.</p>
    </div>
  );
};

export default PersonalDevelopment;
