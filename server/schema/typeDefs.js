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
    type: String!
    durationInMinutes: String!
    cardioDistanceInMiles: String!
    repetitions: Int!
    sets: Int!
    weight: Int!
    caloriesBurnt: Int!
    date: String!
  }

  type Workout {
    id: Int!
    date: String!
    routine: [ID!]
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    getUser: User
    allExercises: [Exercise]!
  }
  
type Mutation {

 
  startProfile(
    firstName: String!, 
    lastName: String!, 
    weight: Float!, 
    age: Int!, 
    height: Int!, 
    sex: String!, 
    goal: String!): User

  createUser(
    email: String!, 
    password: String!
    ): Auth
  login(
    email: String!, 
    password: String!
    ): Auth
 
  addCardio(
    id: Int!,
    type: String!,
    durationInMinutes: String!,
    cardioDistanceInMiles: String!,
    date: String!
  ): Exercise

  addStrength(
    id: Int!,
    type: String!,
    repetitions: String!, 
    sets: String!, 
    weight: String!,
    date: String!
  ): Exercise

  addStretching(
    id: Int!,
    type: String!,
    durationInMinutes: String!,
    date: String!
    
  ): Exercise

  addWorkout(
    id: Int!,
    date: String!,
    routine: [ID!]
  ): Workout

  updateWeight(weightData: Float!): User

}
`;

module.exports = typeDefs;