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

export const ADD_CARDIO = gql`
mutation addCardio(
  $type: String!, 
  $durationInMinutes: String!, 
  $cardioDistanceInMiles: String!, 
 ) {
      addCardio(
        
        type:$type,
        durationInMinutes: $durationInMinutes,
        cardioDistanceInMiles: $cardioDistanceInMiles,
      ){
  	type
  }
}`

export const ADD_PROFILE = gql`
mutation startProfile(
  $firstName: String!, 
  $lastName: String!, 
  $weight: Float!, 
  $age: Int!, 
  $height: Int!, 
  $sex: String!, 
  $goal: String!) {
    startProfile(
      firstName:$firstName,
      lastName: $lastName,
      weight: $weight,
      age: $age,
      height: $height
      sex: $sex,
      goal: $goal
    ) {
      firstName
    }
  }
`;

export const UPDATE_WEIGHT = gql`
  mutation updateWeight($weightData: Float!) {
    updateWeight(weightData: $weightData) {
      _id
      username
      email
      savedWeight
    }
  }
`