const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      //v1//user/123
      const user = await User.findById(req.params.id);
      //findbyid la tim user
      //findbyidanddelete laf tim va xoa
      if (user) {
        res.status(200).json("da xoa thanh cong");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUserInfo: async (req, res) => {
    try {
      const { id } = req.params;

      const { first_name, last_name, phone_number, email, avatar_url } =
        req.body;

      const response = await User.findOneAndUpdate(
        { _id: id },
        {
          first_name,
          last_name,
          phone_number,
          email,
          avatar_url,
        },
        { new: true }
      );

      console.log("responseee", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },

  getUserId: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await User.find({ _id: id });
      console.log("response new", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("error new", error);
      res.status(500).json(error);
    }
  },

  
};

module.exports = userController;
