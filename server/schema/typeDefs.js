const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
<<<<<<< HEAD
    orders: [Order]
=======
    weight: Float!
    goal: String!
>>>>>>> main
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
    ): Exercise

    addWorkout(id: Int!, date: String!, routine: [ID!]): Workout

    updateWeight(weight: Float!): User

    addOrder(products: [ID]!): Order
    
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
