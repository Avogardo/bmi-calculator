const Training = require("../models/training-model");

module.exports = app => {
  app.get('/trainings', async (req, res) => {
    try {
      const { userId } = req.body;
      const trainings = await Training.find({ userId });
      res.send({
        trainings,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.post('/trainings/create', async (req, res) => {
    const { userId, kCalories } = req.body;
    const newTraining = new Training({
      userId,
      kCalories,
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

  app.post('/trainings/remove', async (req, res) => {
    try {
      const { trainingId } = req.body;

      await Training.delete({ _id: trainingId });
      res.send({
        success: true,
      });
    } catch (error) {
      res.send(error);
    }
  });
};
