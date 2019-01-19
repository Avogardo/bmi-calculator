const Food = require("../models/food-model");
const Dish = require("../models/dish-model");

module.exports = app => { // receiving "app" instance
  app.get('/', async (req, res) => {
    try {
      const foods = await Food.find({}).sort({ _id:-1 });
      res.send({
        posts: foods,
      });
    } catch (error) {
      console.error(error);
    }
  });

  // Add new food
  app.post('/food', (req, res) => {
    const { name, kCalories } = req.body;
    const newPost = new Food({
      name,
      kCalories,
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
      console.log(foodIds);
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
};
