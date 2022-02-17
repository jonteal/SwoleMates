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

// export const ADD_EXERCISE = gql`
// mutation addExercise (
//   $date: Date!, 
//   $type: String!, 
//   $durationInMinutes: Number!, 
//   $cardioDistanceInMiles: Number!, 
//   $repetitions: Number!, 
//   $sets: Number! ) {
//       addExercise(
//         date: $date, 
//         type: $type, 
//         durationInMinutes: $durationInMinutes, 
//         cardioDistanceInMiles: $cardioDistanceInMiles, 
//         repetitions: $repetitions, 
//         sets: $sets) 
//   }
// }
// `;
