const { gql } = require('apollo-server-express');

//savedBooks = this will be an array of the Book type
// ! means this field value can never be bull
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }

  type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;