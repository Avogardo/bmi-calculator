const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: String,
  ownerId: String,
  dishesIds: { type: [String], default: [] },
});

const Dish = mongoose.model("Dish", DishSchema);
module.exports = Dish;
