import React from "react";
import './Mates.css';
import { Grid } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';

import { useQuery } from "@apollo/client";

import {
    FETCH_POSTS_QUERY
} from "../../utils/queries";

const Mates = () => {
    const { 
        loading, 
        data: { getPosts: posts} 
    } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        console.log(data);
    }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                <h1>Loading posts...</h1>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={ margin }>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
        
    )
}



export default Mates;