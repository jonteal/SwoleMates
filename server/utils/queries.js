import { gql } from '@apollo/client';

export const QUERY_EXERCISES = gql`
  query allExercises {
    exercises {
      type
    
    }
  }
`;

// FIND ANY USER BY ID OR EMAIL
export const QUERY_USER = gql`
query getUser {
    getUser {
        _id
        email
    }
}
`