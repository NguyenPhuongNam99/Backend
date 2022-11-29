const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
    image: String
})


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500,
        unique: true
    },
    // detail_address: {
    //     type: String,
    //     required: true,
    // },
    address: {
        type: String,
        required: true
    },
    address_detail: String,
    open_time: String,
    close_time: String,
    images: [imageSchema],
    price: Number,
    rate: String
})

restaurantSchema.plugin(AutoIncrement,{inc_field: 'idrestaurant'})
module.exports = mongoose.model("Restaurant", restaurantSchema);