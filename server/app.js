const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day: 24h 60min 60sec 1000milisec
  keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?",
    }],
  );
});

// auth logout
app.get('/auth/logout', (req, res) => {
  // handle with passport
  req.logout();
  console.log('logout');
  res.redirect('http://localhost:8080/');
});

// auth with google+
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// callback route for google to redirect to
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send('you reached the redirect URI');
  console.log('redirect', req.user);
  res.redirect('http://localhost:8080/');
});

app.get('/user', (req, res) => {
  console.log(req.user);
  res.send({
      user: req.user,
    }
  );
});

// connect to mongodb
mongoose.connect(
  'mongodb://localhost:27017/bmi-calculator',
  { useNewUrlParser: true },
  () => {
    console.log('connected to mongodb');
  },
);


app.listen(process.env.PORT || 8081, () => {
  console.log('app now listening for requests on port 8081');
});
