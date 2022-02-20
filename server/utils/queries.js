import { gql } from '@apollo/client';

export const QUERY_EXERCISES = gql`
  query allExercises {
    exercises {
      type
    
    }
  }
`;
