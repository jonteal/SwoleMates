const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedWeight: Profile
    height: Profile
  }

  type Profile {
    _id: ID!
    firstName: String!
    lastName: String!
    weight: Float!
    height: Int!
    age: Int!
    sex: String!
    goal: String!
  }

  type Exercise {
    _id: ID!
    type: String!,
    durationInMinutes: String!,
    cardioDistanceInMiles: String!,
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

 
  startProfile(firstName: String!, lastName: String!, weight: Float!, age: Int!, height: Int!, sex: String!, goal: String!): User

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

  addCardio(
    id: Int!,
    type: String!,
    durationInMinutes: String!,
    cardioDistanceInMiles: String!,
  ): Exercise

  updateWeight(weightData: Float!): User

}
`;

module.exports = typeDefs;