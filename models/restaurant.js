const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const imageSchema = new mongoose.Schema({
  image: String,
});


//theem truong description vao restaurant
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 500,
    unique: true,
  },
  //city id, district id
  address: {
    type: String,
    required: true,
  },
  address_detail: String,
  open_time: String,
  close_time: String,
  images: [imageSchema],
  price: Number,
  rate: String,
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
});

restaurantSchema.plugin(AutoIncrement, { inc_field: "idrestaurant" });
module.exports = mongoose.model("Restaurant", restaurantSchema);
