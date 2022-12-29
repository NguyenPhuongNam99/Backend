const Hotel = require("../models/hotel");

const hotelController = {
  getHotelType: async (req, res) => {
    try {
      const response = await Hotel.find();
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("erorr", error);
    }
  },
  
  createHotel: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        type,
        city_id,
        district_id,
        address_detail,
        price,
      } = req.body;
      const hotelcreate = await Hotel({
        name,
        image,
        description,
        type,
        city_id,
        district_id,
        address_detail,
        price,
      });

      const response = await hotelcreate.save();
      res.status(200).json(response);
    } catch (error) {
      console.log("error hotel create", error);
      res.status(500).json(error);
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Hotel.findByIdAndDelete({ _id: id });
      res.status(200).json("delete hotel success");
    } catch (error) {
      console.log("error delete hotel", error);
      res.status(500).json(error);
    }
  },

  updateHotel: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        type,
        city_id,
        district_id,
        address_detail,
        price,
      } = req.body;
      const { id } = req.params;

      const response = await Hotel.findOneAndUpdate(
        { _id: id },
        {
          name,
          image,
          description,
          type,
          city_id,
          district_id,
          address_detail,
          price,
        },
        { new: true }
      );
      console.log("response new", response);
      res.status(200).json("cap nhat thanh cong");
    } catch (error) {
      console.log("error try", error);
      res.status(500).json(error);
    }
  },

  getAllHotel: async (req, res) => {
    try {
      const response = await Hotel.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getID: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Hotel.findById({ _id: id });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = hotelController;
