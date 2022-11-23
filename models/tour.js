const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema =  mongoose.Schema({
    image: String
})


const tourSchema =  mongoose.Schema({
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
    image: [imageSchema],
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
    created_by: Number,
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

})

tourSchema.plugin(AutoIncrement, {inc_field: 'idVoucher'})

module.exports = mongoose.model("Tour", tourSchema);