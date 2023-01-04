const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
    url: String,
    uid: String
})


const tourSchema = new mongoose.Schema({
    tour_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail: [imageSchema],
    provinces: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    // address: {
    //     type: String,
    //     required: true
    // },
    // address_detail:{
    //     type: String,
      
    // },
    // total_day: Number,
    // created_by: //id nguoi tao
    // created_by: Number,
    // status: String,
    restaurant_id: {
        type: String,
        required: true
    },
    hotel_id: {
        type: String,
        required: true
    },
    is_show: {
        type: Boolean,
        required: true
    },
    is_popular: String

})

tourSchema.plugin(AutoIncrement, {inc_field: 'idTour'})

module.exports = mongoose.model("Tour", tourSchema);