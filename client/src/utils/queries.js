import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
    query getUser {
      getUser {
            weight
            goal
        }
    }
`;

export const QUERY_EXERCISES = gql`
  query allExercises {
    allExercises {
      type
      _id
      date
      durationInMinutes
      cardioDistanceInMiles
      repetitions
      sets
      weight
      caloriesBurnt
    }
    }
`;

export const QUERY_WORKOUTS = gql`
query allWorkouts {
  allWorkouts {
    date
    caloriesBurnt
  }
}
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const GET_SEARCHED_USER = gql`
query getSearchedUser ($email: String!) {
    getSearchedUser (email: $email) {
        _id
        email
    	  firstName
    	  lastName
  }
}
`

export const GET_ME = gql`
query getMe ($id: ID!) {
    getMe (_id: $id) {
      _id
      email
      firstName
      lastName
      goal
      followers {
        _id
        firstName
        lastName
      }
      following{
        _id
        firstName
        lastName
      }
  }
}
`