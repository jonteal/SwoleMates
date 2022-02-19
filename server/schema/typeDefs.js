const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    messages: [Message]
    friends: [User]
    groups: [Group]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser: User
    user(email: String, id: ID): User
  }

  #a group for the chat entity
  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User]! # users in the group
    messages: [Message] # messages sent to the group
  }

  # a message sent from a user to a group
  type Message {
    id: Int! # unique id for message
    to: Group! # group message was sent in
    from: User! # user who sent the message
    text: String! # message text
  }

  
type Mutation {
  createUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  startProfile(name: String!, weight: Int!, age: Int!, height: Int!, sex: String!, goal: String!): User
}
`;

module.exports = typeDefs;