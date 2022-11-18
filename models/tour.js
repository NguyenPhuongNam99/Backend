const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    _id: Number,
    tour_id: Number,
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    // image: []
    city_id: {
        type: Number,
        required: true
    },
    district_id:{
        type: Number,
        required: true
    },
    total_day: Number,
    // created_by: //id nguoi tao
    status: String,
    is_disable: Boolean,
    restaurant_id: {
        type: Number,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    }

},{_id: false})

module.exports = mongoose.model("Tour", tourSchema);