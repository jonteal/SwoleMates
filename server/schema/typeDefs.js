const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
  }
  type Exercise {
    _id: ID!
    type: String!
    durationInMinutes: String!
    cardioDistanceInMiles: String!
    repetitions: Int!
    sets: Int!
    weight: Int!
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
  createUser(
    email: String!, 
    password: String!): Auth
  login(
    email: String!, 
    password: String!): Auth
  startProfile(
    firstName: String!, 
    lastName: String!, 
    weight: Float!, 
    age: Int!, 
    height: Int!, 
    sex: String!,
    activity: String!, 
    goal: String!): User
  addExercise(
    id: Int!,
    type: String!,
    durationInMinutes: String!,
    cardioDistanceInMiles: String!,
    repetitions: Int!,
    sets: Int!,
    weight: Int!,
    caloriesBurnt: Int!
  ): Exercise
}
`;

module.exports = typeDefs;
