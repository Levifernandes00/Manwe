const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async deleteUser(req, res) {
    const { userId } = req.params;
    const user = await User.findById(userId);

    await user.remove();

    return res.send({ ok: true });
  }
};
