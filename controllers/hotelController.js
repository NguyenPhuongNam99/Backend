const Hotel = require("../models/hotel");

const hotelController = {
  getHotelType: async (req, res) => {
    try {
      const response = await Hotel.find();
      const filterTypeHotel = response.filter((item) => item.type === "hotel");
      res.status(200).json(filterTypeHotel);
    } catch (error) {
      console.log("erorr", error);
    }
  },

  getHomeStayType: async (req, res) => {
    try {
      const response = await Hotel.find();
      const filterTypeHotel = response.filter(
        (item) => item.type === "homeStay"
      );
      res.status(200).json(filterTypeHotel);
    } catch (error) {}
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
        room,
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
        room
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
        room
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
          room
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

  updateOneProperty: async (req, res) => {
    try {
      const {
        name,
      } = req.body;
      const { id } = req.params;

      const response = await Hotel.findOneAndUpdate(
        { _id: id },
        {
          name,
        },
        { new: true }
      );
      res.status(200).json("cap nhat thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateRoomStatus: async (req, res) => {
   try {
     const {id, idRoom} = req.body;
    // const hotelResponse = await Hotel.findOne({_id:id});
    // console.log('hot', hotelResponse)
    // const roomStatus = hotelResponse.room.filter((item) => item._id == idRoom);
    // console.log
    // const mergeSrray = roomStatus[0].room_status

    Hotel.update({'_id': id , 'room._id':idRoom},{
      $set: {
        'room.$.room_status':true
      }
    },
    function(err, numAffected){
      console.log('err', err);
      console.log('numffAffected', numAffected)
    })
    res.status(200).json('success')
   } catch (error) {
    res.status(500).json(error)
   }
  }
};

module.exports = hotelController;
