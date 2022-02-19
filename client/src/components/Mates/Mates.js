import React from "react";
import './Mates.css';

import { useQuery } from "@apollo/client";

import {
    FETCH_POSTS_QUERY
} from "../../utils/queries";

const Mates = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        console.log(data);
    }

    return (
        <h1>Mates</h1>
        
    )
}



export default Mates;