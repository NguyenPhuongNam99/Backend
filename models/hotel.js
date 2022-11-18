const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = mongoose.Schema({
    _id: Number,
    image: String
}, {_id: false})

imageSchema.plugin(AutoIncrement);

const hotelSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    image: [imageSchema],
    detail_address: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    type: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    city_id: Number, // getfillCity: ==> city ==> cityid,
    district_id: Number, // getFullDistric ==> district_name_ ==> distric_id
    rate: String
}, {_id: false})

module.exports = mongoose.model("Hotel", hotelSchema);