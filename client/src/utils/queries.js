import { gql } from '@apollo/client';

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
