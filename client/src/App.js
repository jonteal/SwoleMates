import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Navbar from './components/Navbar/Navbar';
import MealPlanner from './components/MealPlanner/MealPlanner.jsx'
import Profile from './components/Profile/Profile'
import Foodbar from './components/Food/Food'
import Quote from './components/Quote/Quote';
import Exercise from './components/Tracker/Exercise';
import PersonalDevelopment from './components/PersonalDevelopment/PersonalDevelopment';

import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import Welcome from './components/Welcome/Welcome'


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Router>

          <Navbar />

          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' component={SignupForm} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/quote' component={Quote} />
            <Route exact path='/personaldevelopment' component={PersonalDevelopment} />
            <Route exact path='/food' component={Foodbar} />
            <Route exact path='/mealplan' component={MealPlanner} />
            <Route exact path='/exercise' component={Exercise} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </Router>
      </>
    </ApolloProvider>

  );
}

export default App;