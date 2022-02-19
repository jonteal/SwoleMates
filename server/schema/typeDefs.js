const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    firstName: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment{
    id: ID!
    createdAt: String!
    firstName: String!
    body: String!
  }

  type Like{
    id: ID!
    createdAt: String!
    firstName: String!
  }

  type Query {
    getUser: User
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  
type Mutation {
  createUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  startProfile(name: String!, weight: Int!, age: Int!, height: Int!, sex: String!, goal: String!): User

  createPost(body:String!, firstName: String!): Post!
  deletePost(postId: ID!): String!
  createComment(postID:ID!, body: String!): Post!
  deleteComment(postId: ID!, commentId: ID!): Post!
  likePost(postId: ID!): Post!
}
`;

module.exports = typeDefs;