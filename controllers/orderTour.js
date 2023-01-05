const orderTour = require("../models/order_tour");
const user = require("../models/User");
const Tour = require("../models/tour");
const City = require("../models/City");
const hotel = require("../models/hotel");
const restaurant = require("../models/restaurant");

const orderController = {
  createOrderTour: async (req, res) => {
    try {
      const {
        user_id,
        tour_id,
        voucher_id,
        total_price,
        status,
        payment_state,
        assyneBy,
        evaluate,
        fullName,
        phoneUser,
        tourName,
        emailUser,
      } = req.body;
      const response = await new orderTour({
        user_id,
        tour_id,
        voucher_id,
        total_price,
        status,
        payment_state,
        assyneBy,
        evaluate,
        fullName,
        phoneUser,
        tourName,
        emailUser,
      }).save();
      console.log("response new", response);
      res.status(200).json("Dat Tour thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllOrderTour: async (req, res) => {
    try {
      const response = await orderTour.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteOrderTour: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await orderTour.findByIdAndDelete({ _id: id });
      res.status(200).json("xoa order tour thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateOrderTour: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        user_id,
        tour_id,
        voucher_id,
        total_price,
        status,
        payment_state,
        assyneBy,
        evaluate,
        fullName,
        phoneUser,
        tourName,
        emailUser,
      } = req.body;
      await orderTour.findOneAndUpdate(
        { idOrderTour: id },
        {
          user_id,
          tour_id,
          voucher_id,
          total_price,
          status,
          payment_state,
          assyneBy,
          evaluate,
          fullName,
          phoneUser,
          tourName,
          emailUser,
        },
        { new: true }
      );
      res.status(200).json("cap nhat order tour thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOrderID: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await orderTour.findOne({ _id: id });
      console.log("response ", response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  onlyUpdateOrderTour: async (req, res) => {
    try {
      const { id } = req.params;
      const { assyneBy } = req.body;

      console.log("assyneBy", assyneBy);

      const response = await orderTour.findOneAndUpdate(
        { _id: id },
        { assyneBy: assyneBy },
        { new: true }
      );
      const userUpdate = await user.findOneAndUpdate(
        {
          _id: response.assyneBy,
        },
        {
          status: "available",
        },
        {
          new: true,
        }
      );
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },

  getOrderTourOfIdHDV: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await orderTour.find({ assyneBy: id });
      const responseTour = await Tour.find();
      const emptyData = [];
      const cityResponse = await City.find();
      const hotelResponse = await hotel.find();
      let cityEmpty = "";
      let hotelData = "";
      let visitLocation = {};
      // console.log('cityr res', cityResponse)

      response.map((item) => {
        for (var i = 0; i < responseTour.length; i++) {
          if (Number(item.tour_id) === Number(responseTour[i].idTour)) {
            cityResponse.filter((itemCity) => {
              if (Number(itemCity.cityId) === Number(responseTour[i].city)) {
                cityEmpty = itemCity.name;
                visitLocation = {
                  lat: itemCity.lat,
                  lng: itemCity.lng,
                };
              }
            });

            //da xong nhung co ve data tout dang ko khop vi data hotel xoa di nhung hotel_id van auto tang
            hotelResponse.filter((itemHotel) => {
              console.log("item", itemHotel.idHotel, responseTour[i].hotel_id);
              if (
                Number(itemHotel.idHotel) === Number(responseTour[i].hotel_id)
              ) {
                hotelData = itemHotel.name;
              }
            });

            emptyData.push({
              item: item,
              tourDefault: responseTour[i],
              cityName: cityEmpty,
              hotelName: hotelData,
              visitLocation: visitLocation,
            });
          }
        }
      });
      res.status(200).json(emptyData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOrderTourofUser: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await orderTour.find({ user_id: id });
      const responseTour = await Tour.find();
      const cityData = await City.find();

      const emptyArray = [];
      response.map((item) => {
        for (var i = 0; i < responseTour.length; i++) {
          if (item.tour_id === Number(responseTour[i].idTour))
            emptyArray.push({
              item: responseTour[i],
              statusTour: item.status
            });
        }
      });

      const formatCitydata = [];
      emptyArray.map((itemFormat) => {
        for (var i = 0; i < cityData.length; i++) {
          if (Number(itemFormat.item.city) === Number(cityData[i].cityId)) {
            formatCitydata.push({
              item: itemFormat,
              cityName: cityData[i].name,
            });
          }
        }
      });
      res.status(200).json(formatCitydata);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  onlyUpdateStatusTour: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const response = await orderTour.findOneAndUpdate(
        {
          _id: id,
        },
        {
          status: status,
        },
        {
          new: true,
        }
      );
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },
};

module.exports = orderController;
