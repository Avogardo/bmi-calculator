const User = require("../models/user-model");

module.exports = app => {
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
};
