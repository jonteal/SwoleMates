import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WEIGHT } from '../../utils/queries';
import { UPDATE_WEIGHT } from '../../utils/mutations';
import './weight.css';

const Weight = () => {
    const { loading, data } = useQuery(GET_WEIGHT);
    const weigthData = data?.me || {};

    const [updateWeight, {error}] = useMutation(UPDATE_WEIGHT);

    // function not finished
    const handleUpdateWeight = async (savedWeight) => {
        const weightToSave = 
        console.log(savedWeight);
    };

    const [userWeightData, setUserWeightData] = useState({ weight: '' });
    const [weight, setWeight] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const { weight, value } = event.target;
        setUserWeightData({ ...userWeightData, [weight]: value });
    };

    return (
        <>
        <div className="weight-container filter drop-shadow-lg">
            <div className="weight-card">
                <h1 className="weight-header">Add Weight Here</h1>
                <form className="weight-form" onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <input
                    className="weight-input"
                    type="text"
                    placeholder="200 lbs"
                    name="weight"
                    required
                />
                <button 
                    className="weightButton filter drop-shadow-lg"
                    type="submit"
                    variant="success">
                        Submit
                </button>
                </form>
            </div>
        </div>
        </>
    );
}
 
export default Weight;