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
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  city_id: String,
  district_id: String,
  address_detail: {
    type: String,
    required: true,
  },
  price: String,
  open_time: String,
  close_time: String,
  images: [imageSchema],
  // rate: String,
});

restaurantSchema.plugin(AutoIncrement, { inc_field: "idrestaurant" });
module.exports = mongoose.model("Restaurant", restaurantSchema);
