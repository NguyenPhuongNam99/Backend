const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = mongoose.Schema({
    _id: Number,
    image: String
}, {_id: false})

imageSchema.plugin(AutoIncrement)

const restaurantSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    detail_address: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    city_id: Number,
    district_id: Number,
    open_time: String,
    close_time: String,
    images: [imageSchema],
    price: Number,
    rate: String
},{_id: false})

module.exports = mongoose.model("Restaurant", restaurantSchema);