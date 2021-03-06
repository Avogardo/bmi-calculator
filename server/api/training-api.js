const Training = require("../models/training-model");

module.exports = app => {
  app.get('/trainings', async (req, res) => {
    try {
      const { _id } = req.user;
      const trainings = await Training.find({ userId: _id });
      res.send({
        trainings,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/today-trainings', async (req, res) => {
    try {
      const { _id } = req.user;
      const start = new Date();
      start.setHours(0,0,0,0);
      const end = new Date();
      end.setHours(23,59,59,999);
      const trainings = await Training.find({
        userId: _id,
        date: {
          $gte: start,
          $lt: end,
        },
      });
      res.send({
        trainings,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.post('/trainings/create', async (req, res) => {
    const { userId, trainingsCalories } = req.body;
    const newTraining = new Training({
      userId,
      kCalories: trainingsCalories,
    });

    try {
      await newTraining.save();
      res.send({
        success: true,
        message: 'Training saved successfully!',
      });
    } catch(error) {
      console.log(error);
    }
  });

  app.delete('/trainings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Training.remove({ _id: id });
      res.send({
        success: true,
      });
    } catch (error) {
      res.send(error);
    }
  });
};
