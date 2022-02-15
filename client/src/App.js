import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ComingSoon from './components/ComingSoon';
import Foodbar from './components/Food/Food.jsx'
// import Navbar from './components/navbar/Navbar';
import MealPlanner from './components/MealPlanner/MealPlanner.jsx'
import Profile from './components/Profile/Profile'
import Foodbar from './components/Food/Food'


import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SignupForm from './components/SignupForm/SignupForm';


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
        {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' component={ComingSoon} />
            <Route exact path='/signup' component={SignupForm} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/food' component={Foodbar} />
            <Route exact path='/mealplan' component={MealPlanner} />
            {/* <Route exact path='/signup' component={SignupForm} /> */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
      </Router>
      </>
    </ApolloProvider>

  );
}

export default App;
