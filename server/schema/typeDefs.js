const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    friends: [User]
  }

  type Friend {
    friendId: ID!
    firstName: String!
    lastName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser: User
  }$


  
type Mutation {
  createUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  startProfile(name: String!, weight: Int!, age: Int!, height: Int!, sex: String!, goal: String!): User

  addFriend(friendId: ID!): User
  removeFriend(friendId: ID!): User
}
`;

module.exports = typeDefs;