import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import MealPlanner from './components/MealPlanner/MealPlanner.jsx';
import Profile from './components/Profile/Profile';
import Foodbar from './components/Food/Food';
import Quote from './components/Quote/Quote';
import PersonalDevelopment from './components/PersonalDevelopment/PersonalDevelopment';
import Mates from './components/Mates/Mates';
import SearchResults from './components/SearchResults/SearchResults';
import FollowingContainer from './components/FollowingContainer/FollowingContainer';
import FollowersContainer from './components/FollowersContainer/FollowersContainer';

import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import Welcome from './components/Welcome/Welcome';
import WrongPage from './components/WrongPage/WrongPage';
import Sponsor from './components/Sponsor/Sponsor';
import Success from './pages/Success';
import PersonalProfile from './components/PersonalProfile/PersonalProfile';
import Tracker from './components/Tracker/Tracker'
import Exercise from './components/Tracker/Exercise'
import BarChart from './components/Chart/Chart';


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
        <Router>
          <div>
            <StoreProvider>
              <Navbar />
                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <Route exact path='/login' component={LoginForm} />
                  <Route exact path='/signup' component={SignupForm} />
                  <Route exact path='/notfound' component={WrongPage} />
                  <PrivateRoute exact path='/home' component={Dashboard} />
                  <PrivateRoute exact path='/profile' component={Profile} />
                  <PrivateRoute exact path='/food' component={Foodbar} />
                  <PrivateRoute exact path='/mealplan' component={MealPlanner} />
                  <PrivateRoute exact path='/exercise' component={Tracker} />
                  <PrivateRoute exact path='/sponsor' component={Sponsor} />
                  <PrivateRoute exact path='/success' component={Success} />   
                  <PrivateRoute exact path='/logworkout' component={Exercise} />
                  <Redirect from="*" to="/notfound" />
                </Switch>
            </StoreProvider>
          </div>
        </Router>
    </ApolloProvider>

  );
}

export default App;