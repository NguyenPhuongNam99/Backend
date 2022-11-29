const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
    image: String
})


const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500,
        unique: true
    },
    image: [imageSchema],
    detail_address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
    },
    type: { //resort or hotel
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
    },
    address: {
        type: String,
        required: true
    }, // getfillCity: ==> city ==> cityid,
    address_detail: {
        type: String
    }, // getFullDistric ==> district_name_ ==> distric_id
    rate: String
})

hotelSchema.plugin(AutoIncrement, {inc_field: 'idHotel'})
module.exports = mongoose.model("Hotel", hotelSchema);