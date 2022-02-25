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

export const GET_ME = gql`
query getMe ($id: ID!) {
    getMe (_id: $id) {
      _id
      email
      firstName
      lastName
      followerCount
      goal
      following
      followers
  }
}
`

export const GET_ACCOUNT = gql`
  query getAccount {
    getAccount {
      _id
      email
      firstName
      lastName
      goal
      following {
        _id
      }
      followers {
        _id
      }
    }
  }
`