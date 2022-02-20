import React, { useState, useEffect, Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WEIGHT } from '../../utils/queries';
import { UPDATE_WEIGHT } from '../../utils/mutations';
import './weight.css';

class Weight extends Component {
    state= {showForm: false}

    showForm = () => {
        return (
            <div className="weight-container filter drop-shadow-lg">
                <div className="weight-card">
                    <h1 className="weight-header">Add Weight Here</h1>
                    <form className="weight-form">
                    <input
                        className="weight-input"
                        type="text"
                        placeholder="200 lbs"
                        name="weight"
                        required
                    />
                    <button
                        onClick={() => this.setState({showForm: false}) } 
                        className="weightButton filter drop-shadow-lg"
                        type="submit"
                        variant="success">
                            Submit
                    </button>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        return (
        <>
        <div className="weight-container filter drop-shadow-lg">
            
                {
                this.state.showForm 
                ? this.showForm() 
                : <div className="weight-card">
                <h1 className="weight-header">Current Weight</h1>
                <div className="current-weight">
                    267.8 lbs
                </div>
                <button
                    onClick={() => this.setState({showForm: true}) } 
                    className="weightBtn filter drop-shadow-lg"
                    type="button"
                    variant="success">
                        Update
                </button>
                </div>
                }
            </div>
        
        </>
        );
    };
}
 
export default Weight;