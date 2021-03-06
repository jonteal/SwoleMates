import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_WORKOUT = gql`
mutation addWorkout(
  $id: Int!
  $date: String!
  $routine: [ID!]
  $caloriesBurnt: Float
) {
  addWorkout(
    id: $id
    date: $date
    routine: $routine
    caloriesBurnt: $caloriesBurnt
  ) {
    date
  }
}
`;

export const ADD_CARDIO = gql`
  mutation addCardio(
    $id: Int!
    $type: String!
    $durationInMinutes: String!
    $cardioDistanceInMiles: String!
    $date: String!
    $caloriesBurnt: Float!
  ) {
    addCardio(
      id: $id
      type: $type
      durationInMinutes: $durationInMinutes
      cardioDistanceInMiles: $cardioDistanceInMiles
      date: $date
      caloriesBurnt: $caloriesBurnt
    ) {
      type
    }
  }
`;

export const ADD_STRENGTH = gql`
  mutation addStrength(
    $id: Int!
    $type: String!
    $repetitions: String!
    $sets: String!
    $weight: String!
    $date: String!
  ) {
    addStrength(
      id: $id
      type: $type
      repetitions: $repetitions
      sets: $sets
      weight: $weight
      date: $date
    ) {
      type
    }
  }
`;

export const ADD_STRETCHING = gql`
  mutation addStretching(
    $id: Int!
    $type: String!
    $durationInMinutes: String!
    $date: String!
    $caloriesBurnt: Float!
  ) {
    addStretching(id: $id, type: $type, durationInMinutes: $durationInMinutes, date: $date,  caloriesBurnt: $caloriesBurnt) {
      type
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation startProfile(
    $firstName: String!
    $lastName: String!
    $weight: Float!
    $age: Int!
    $height: Int!
    $sex: String!
    $goal: String!
  ) {
    startProfile(
      firstName: $firstName
      lastName: $lastName
      weight: $weight
      age: $age
      height: $height
      sex: $sex
      goal: $goal
    ) {
      _id
    }
  }
`;

export const UPDATE_WEIGHT = gql`
  mutation updateWeight($weight: Float!) {
    updateWeight(weight: $weight) {
      _id
      email
      weight
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const FOLLOW_UNFOLLOW = gql`
  mutation followUnfollow($_id: String!) {
    followUnfollow(_id: $_id) {
      _id
      following {
        _id
      }
      followers {
        _id
      }
    }
  }
`;
