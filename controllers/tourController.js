const Tour = require("../models/tour");

const tourController = {
  creatTour: async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        address,
        address_detail,
        total_day,
        created_by,
        status,
        restaurant_id,
        hotel_id,
        image,
        is_show
      } = req.body;

      const newCreate = await new Tour({
        name: name,
        description: description,
        price: price,
        address: address,
        address_detail: address_detail,
        total_day: total_day,
        created_by: created_by,
        status: status,
        restaurant_id: restaurant_id,
        hotel_id: hotel_id,
        image: image,
        is_show: is_show
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
      res.status(200).json(response)

    } catch (error) {
      console.log('error tour', error)
      res.status(500).json(error)
    }
  },

  updateTour: async (req, res) => {
    try {
      
      const {id} = req.params;
      const {
        name,
        description,
        price,
        address,
        address_detail,
        total_day,
        created_by,
        status,
        restaurant_id,
        hotel_id,
        image,
        is_show
      } = req.body;
      
      await Tour.findOneAndUpdate({idTour: id}, {
        name,
        description,
        price,
        address,
        address_detail,
        total_day,
        created_by,
        status,
        restaurant_id,
        hotel_id,
        image,
        is_show

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