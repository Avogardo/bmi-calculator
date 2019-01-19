const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  kCalories: Number,
  userId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Training = mongoose.model("Training", TrainingSchema);
module.exports = Training;
