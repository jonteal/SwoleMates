import React from "react";
import './mates.css';
import { Grid } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';

import { useQuery } from "@apollo/client";


const Mates = () => {

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                <h1>Loading posts...</h1>            
            </Grid.Row>
        </Grid>
        
    )
}



export default Mates;