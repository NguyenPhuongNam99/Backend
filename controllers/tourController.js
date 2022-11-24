const Tour = require("../models/tour");

const tourController = {
  creatTour: async (req, res) => {
    try {
      const {
        tour_id,
        name,
        description,
        price,
        city_id,
        district_id,
        total_day,
        created_by,
        status,
        is_disable,
        restaurant_id,
        hotel_id,
        image,
      } = req.body;

      const newCreate = await new Tour({
        tour_id: tour_id,
        name: name,
        description: description,
        price: price,
        city_id: city_id,
        district_id: district_id,
        total_day: total_day,
        created_by: created_by,
        status: status,
        is_disable: is_disable,
        restaurant_id: restaurant_id,
        hotel_id: hotel_id,
        image: image,
      });

      const creatTour = await newCreate.save();
      res.status(200).json(creatTour);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error)
    }
  },

  getAllTour: async (req, res) => {
    try {
      
      const response = await Tour.find();
      res.status().json(response)

    } catch (error) {
      res.status(500).json(error)
    }
  },

  updateTour: async (req, res) => {
    try {
      
      const {id} = req.params;
      const {
        tour_id,
        name,
        description,
        price,
        city_id,
        district_id,
        total_day,
        created_by,
        status,
        is_disable,
        restaurant_id,
        hotel_id,
        image,
      } = req.body;
      
      await Tour.findOneAndUpdate({idTour: id}, {
        tour_id,
        name,
        description,
        price,
        city_id,
        district_id,
        total_day,
        created_by,
        status,
        is_disable,
        restaurant_id,
        hotel_id,
        image

      },{new: true})

      res.status(200).json('cap nhat thanh cong')


    } catch (error) {
      res.status(500).json('cap nhat that bai')

    }
  },
  
  deleteTour: async (req, res) => {
    try {
      
      const {id} = req.params;
      await Tour.findByIdAndDelete({_id: id});
      res.status(200).json('xoa tour thanh cong')

    } catch (error) {
      
      res.status(500).json('xoa that bai')
    }
  }
};


module.exports = tourController;