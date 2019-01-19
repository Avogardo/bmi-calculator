const Food = require("../models/food-model");
const Dish = require("../models/dish-model");

module.exports = app => {
  app.get('/dishes', async (req, res) => {
    const { user } = req;

    if (user) {
      try {
        const dishes = await Dish.find({ ownerId: req.user._id });
        const dishesResponse = [];

        for (let i = 0; i < dishes.length; i++) {
          const { name, foodIds, _id } = dishes[i];
          const foods = await Food.find({ _id: { $in: foodIds } });

          dishesResponse.push({
            name,
            ownerName: req.user.userName,
            foods,
            _id,
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
};
