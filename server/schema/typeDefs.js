const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Exercise {
    _id: ID!
    id: Int!,
    type: String!,
    durationInMinutes: Int!,
    cardioDistanceInMiles: Int!,
    repetitions: Int!,
    sets: Int!,
    weight: Int!,
    caloriesBurnt: Int!
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    getUser: User
  }
  
type Mutation {

  createUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  startProfile(firstName: String!, lastName: String!, weight: Int!, age: Int!, height: Int!, sex: String!, goal: String!): User

  createUser(
    email: String!, 
    password: String!
    ): Auth
  login(
    email: String!, 
    password: String!
    ): Auth
  addExercise(
    id: Int!,
    type: String!,
    durationInMinutes: Int!,
    cardioDistanceInMiles: Int!,
    repetitions: Int!,
    sets: Int!,
    weight: Int!,
    caloriesBurnt: Int!
  ): Exercise

}
`;

module.exports = typeDefs;