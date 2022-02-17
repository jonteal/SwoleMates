const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Profile {
    _id: ID!
    firstName: String!
    lastName: String!
    weight: Int!
    age: Int!
    height: Int!
    sex: String!
    goal: String!
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
}
`;

module.exports = typeDefs;