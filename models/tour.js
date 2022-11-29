const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema =  mongoose.Schema({
    image: String
})


const tourSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
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
    address: {
        type: String,
        required: true
    },
    address_detail:{
        type: String,
      
    },
    total_day: Number,
    // created_by: //id nguoi tao
    created_by: Number,
    status: String,
    restaurant_id: {
        type: Number,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    },
    is_show: {
        type: Boolean,
        required: true
    }

})

tourSchema.plugin(AutoIncrement, {inc_field: 'idTour'})

module.exports = mongoose.model("Tour", tourSchema);