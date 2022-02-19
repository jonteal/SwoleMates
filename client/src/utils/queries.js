import { gql } from '@apollo/client';


export const FETCH_POSTS_QUERY = gql`
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