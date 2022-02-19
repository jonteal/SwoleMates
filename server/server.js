const express = require('express');
//requiring ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const env = require('dotenv').config();
const { mocks } = require('./data/mocks');

//schema set up
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

// const { authMiddleware } = require('./schemas');

const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

//new ApolloServer, uses typeDefs & resolvers we required above
const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false })); //true or false?
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// setting up port 3001 listener AND graphQL playground
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running 🏃🏽‍♂️🏃🏽‍♀️ on port ${PORT}!`);
    //playground for GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});