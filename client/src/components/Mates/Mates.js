import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql';
import './Mates.css';

const Mates = () => {
    return (
        <h1>Mates</h1>
        
    )
}

const FETCH_POSTS_QUERY = gql`
    getPosts{
    id body createdAt firstName likeCount
    likes{
    firstName
    }
    commentCount
    comments{
    id firstName createdAt body
    }
}
`

export default Mates;