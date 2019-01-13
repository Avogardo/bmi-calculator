const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Food = require("./models/food-model");
const Dish = require("./models/dish-model");
const User = require("./models/user-model");

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
  Food.find({}, 'name description', function (error, posts) {
    if (error) {
      console.error(error);
    }

    res.send({
      posts: posts
    })
  }).sort({_id:-1})
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
  res.send({
    user: req.user,
  });
});

app.put('/user', async (req, res) => {
  const {
    gender,
    height,
    weight,
    age,
    neededDailyCal,
    userId,
  } = req.body;

  try {
    const user = await User.findById(userId);
    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.age = age;
    user.neededDailyCal = neededDailyCal;
    user.save();

    res.send({
      success: true,
    });
  } catch (error) {
    res.send(error);
  }
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

// Add new food
app.post('/food', (req, res) => {
  const { name, description } = req.body;
  const newPost = new Food({
    name,
    description,
  });

  newPost.save((error) => {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: 'Food saved successfully!',
    });
  });
});

// Delete a food
app.post('/food/remove', async (req, res) => {
  try {
    const { foodIds } = req.body;
    for (let i = 0; i < foodIds.length; i++) {
      const foodId = foodIds[i];
      const dishesWithFoodToRemove = await Dish.find({ foodIds: foodId });

      for (const dish of dishesWithFoodToRemove) {
        dish.foodIds.splice(dish.foodIds.indexOf(foodId), 1);
        await dish.save();
      }
    }

    await Food.deleteMany({ _id: { '$in': foodIds } });
    res.send({
      success: true,
    });
  } catch (error) {
    res.send(error);
  }
});

app.get('/dishes', async (req, res) => {
  const { user } = req;

  if (user) {
    try {
      const dishes = await Dish.find({ ownerId: req.user._id });
      const dishesResponse = [];

      for (let i = 0; i < dishes.length; i++) {
        const { name, foodIds } = dishes[i];
        const foods = await Food.find({ _id: { $in: foodIds } });

        dishesResponse.push({
          name,
          ownerName: req.user.userName,
          foods,
        });
      }
      res.send({
        dishes: dishesResponse,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.send({
      dishes: [],
    });
  }
});

app.post('/dishes', (req, res) => {
  const { name, foodIds, ownerId } = req.body;
  const newDish = new Dish({
    ownerId,
    name,
    foodIds,
  });

  newDish.save((error) => {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: 'Food saved successfully!',
    });
  });
});

app.post('/dishes/remove', (req, res) => {
  const { foodIds } = req.body;

  Dish.remove({
    _id: { '$in': foodIds }
  }, (err) => {
    if (err) {
      res.send(err);
    }

    res.send({
      success: true,
    });
  });
});
