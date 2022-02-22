import { gql } from '@apollo/client';

// FIND ME
export const GET_WEIGHT = gql`
    query getUser {
      getUser {
            weight
        }
    }
`;

export const QUERY_EXERCISES = gql`
query allExercises {
    allExercises {
        type
        _id
        date
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