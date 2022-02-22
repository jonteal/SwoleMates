import React from "react";
import './tracker.css'
import LogSwole from './Exercise'
import DisplaySwole from './Workout'

const Tracker = () => {
    return (
        <>
        <div className="trackerContainer">
            <DisplaySwole />
        </div>
        {/* <LogSwole /> */}
        </>

    )
}

export default Tracker;

