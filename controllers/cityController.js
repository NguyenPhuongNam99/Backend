const City = require("../models/City");

const cityController = {
  getAllCity: async (req, res) => {
    try {
      const response = await City.find();
      console.log("response new", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },

  createCity: async (req, res) => {
    try {
      const { name, decription, districtArray, lat, lng } = req.body;
      const cityCreate = await City({
        name,
        decription,
        districtArray,
        lat,
        lng,
      }).save();
      console.log("cityC", cityCreate);
      res.status(200).json(cityCreate);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCity: async (req, res) => {
    try {
      const {id} = req.params;
      await City.findByIdAndDelete({_id: id})
      res.status(200).json('delete success')
    } catch (error) {
        res.status(500).json(error)
    }
  },

  getDistrictofCity: async ( req, res) => {
    try {
      const {id} = req.params;
      const response = await City.find({name: id});
      console.log('response get', response, response[0].districtArray)
      res.status(200).json(response[0].districtArray)
    } catch (error) {
      res.status(500).json(error)
    }
  }
};

module.exports = cityController;
