const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const districtArraySchema = new mongoose.Schema({
    name: String,
})

districtArraySchema.plugin(AutoIncrement, {inc_field: 'districtId'})

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    decription: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    districtArray: [districtArraySchema],
    lat: String,
    lng: String
}, {timestamps: true})
citySchema.plugin(AutoIncrement, {inc_field: 'cityId'})

module.exports = mongoose.model("City", citySchema);