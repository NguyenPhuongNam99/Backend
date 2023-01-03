const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const imageSchema = new mongoose.Schema({
  image: String,
});

const roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
    unique: true,
  },
  room_price: String,
  room_quantity: Number,
  status: String,
  key: String
})

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 500,
    unique: true,
  },
  image: [imageSchema],
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  type: {
    //resort or hotel
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  city_id: String,
  district_id: String,
  address_detail: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },

  room: [roomSchema]
});

hotelSchema.plugin(AutoIncrement, { inc_field: "idHotel" });
module.exports = mongoose.model("Hotel", hotelSchema);
