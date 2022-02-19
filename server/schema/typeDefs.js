const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser: User
    user(email: String, id: ID): User
    messages(groupId: Int, userId: Int): [Message]
    group(id: Int!): Group
  }


  schema {
    query: Query
  }

  
type Mutation {
  createUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  startProfile(name: String!, weight: Int!, age: Int!, height: Int!, sex: String!, goal: String!): User

  addFriend(id: ID!, username: String!): User
  removeFriend(id: ID!): 
}
`;

module.exports = typeDefs;