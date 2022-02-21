import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

// import ComingSoon from './components/ComingSoon';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import MealPlanner from './components/MealPlanner/MealPlanner.jsx';
import Profile from './components/Profile/Profile';
import Foodbar from './components/Food/Food';
import Quote from './components/Quote/Quote';
import Exercise from './components/Tracker/Exercise';
import Workout from './components/Tracker/Workout';
import PersonalDevelopment from './components/PersonalDevelopment/PersonalDevelopment';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import Welcome from './components/Welcome/Welcome';
import WrongPage from './components/WrongPage/WrongPage';
import Sponsor from './components/Sponsor/Sponsor';
import Success from './pages/Success';

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
              {/* <Navbar /> */}
                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <Route exact path='/login' component={LoginForm} />
                  <Route exact path='/signup' component={SignupForm} />
                  <Route exact path='/home' component={Dashboard} />
                  <Route exact path='/profile' component={Profile} />
                  <Route exact path='/quote' component={Quote} />
                  <Route exact path='/personaldevelopment' component={PersonalDevelopment} />
                  <Route exact path='/food' component={Foodbar} />
                  <Route exact path='/mealplan' component={MealPlanner} />
                  <Route exact path='/exercise' component={Exercise} />
                  <Route exact path='/sponsor' component={Sponsor} />
                  <Route exact path='/workout' component={Workout} />
                  <Route exact path='/success' component={Success} />
                  <Route render={WrongPage} />
                </Switch>
            </StoreProvider>
          </div>
        </Router>
    </ApolloProvider>

  );
}

export default App;