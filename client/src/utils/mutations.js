import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($email: String!, $password:String!) {
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
        }}
`;