const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const reviewSchema = new mongoose.Schema({
    user_id: Number,
    content: {
        type: String,
        required: true,
        minlength: 1,
    },
    rate_star: String,
    // type: String, ///TYpe: Tour, Hotel, Restaurant
    toud_id: Number,// toud_id || hotel_id || restaurant_id: doi tuong review
    title: String
})

reviewSchema.plugin(AutoIncrement, {inc_field: 'idReview'})

module.exports = mongoose.model("Review", reviewSchema)