const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Food = require("./models/food-model");
const keys = require('./config/keys');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('change color', (color) => {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });

  socket.on('addFood', ({name, kCalories}) => {
    console.log(name, kCalories);

    const newPost = new Food({
      name,
      kCalories,
    });
    newPost.save((error) => {
      if (error) {
        console.log(error);
      }
      io.sockets.emit('foodSaved');
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(8082, () => console.log(`Listening on port ${8082}`));

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

require("./api/dish-api")(app);
require("./api/food-api")(app);
require("./api/user-api")(app);
require("./api/training-api")(app);

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

module.exports = app;
