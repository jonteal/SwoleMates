const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    followerCount: Int
    orders: [Order]
    weight: Float!
    goal: String!
    following: [User]
    followers: [User]
  }

  type Following {
    _id: ID!
  }

  type Followers {
    _id: ID!
  }

  type Exercise {
    _id: ID!
    type: String!
    durationInMinutes: String
    cardioDistanceInMiles: String
    repetitions: Int
    sets: Int
    weight: Int
    caloriesBurnt: Float
    date: String!
  }

  type Workout {
    id: Int!
    date: String!
    caloriesBurnt: Float
    routine: [ID!]
    userId: ID!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getMe(_id: ID!): User
    getSearchedUser(email: String): [User]
    getUser: User
    allExercises: [Exercise]!
    allWorkouts: [Workout]!
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  
type Mutation {

    createUser(email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    startProfile(
      firstName: String!
      lastName: String!
      weight: Float!
      age: Int!
      height: Int!
      sex: String!
      activity: Float
      goal: String!
    ): User

    addCardio(
      id: Int!
      type: String!
      durationInMinutes: String!
      cardioDistanceInMiles: String!
      date: String!
      caloriesBurnt: Float!
    ): Exercise

    addStrength(
      id: Int!
      type: String!
      repetitions: String!
      sets: String!
      weight: String!
      date: String!
    ): Exercise

    addStretching(
      id: Int!
      type: String!
      durationInMinutes: String!
      date: String!
      caloriesBurnt: Float!
    ): Exercise

    addWorkout(
      id: Int!
      date: String!
      routine: [ID!]
      caloriesBurnt: Float
      ): Workout

    updateWeight(weight: Float!): User

    allExercises: [Exercise]!

    followUnfollow(_id: ID!): User
    
    addOrder(products: [ID]!): Order
    
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
