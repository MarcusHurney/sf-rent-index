const express = require('express');
const path = require('path');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackBaseConfig = require('../webpack.base.config.js');
const { MY_MONGO_URI } = require('./config/keys.js');

// Create a new Express application
const app = express();

// Check for environment and define baths
const isDevelopment = process.env.NODE_ENV !== "production";
const BUILD_DIR = path.resolve(__dirname, '../build');
const HTML_FILE = path.resolve(__dirname, '../client/index.html');
const baseCompiler = webpack(webpackBaseConfig);

// Replace with your MongoLab URI
const MONGO_URI = MY_MONGO_URI;

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

if (isDevelopment) {
  app.use(webpackMiddleware(baseCompiler));
} else {
  app.use(express.static(BUILD_DIR));
  app.get("*", (req, res) => res.sendFile(HTML_FILE));
}

module.exports = app;
