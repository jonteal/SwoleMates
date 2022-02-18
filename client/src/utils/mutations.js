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
// 1)
// create add exer\work here

export const ADD_EXERCISE = gql`
mutation addExercise($id: Int!, 
  $type: String!, 
  $durationInMinutes: Int!, 
  $cardioDistanceInMiles: Int!, 
  $repetitions: Int!, 
  $sets: Int!, 
  $weight: Int!, 
  $caloriesBurnt: Int!) {
      addExercise(
        id: $id,
        type:$type,
        durationInMinutes: $durationInMinutes,
        cardioDistanceInMiles: $cardioDistanceInMiles,
        repetitions: $repetitions,
        sets: $sets,
        weight: $weight,
        caloriesBurnt: $caloriesBurnt
      ){
  	id
  }
}`