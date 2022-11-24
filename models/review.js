const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
    image: String
})


const reviewSchema = new mongoose.Schema({
    user_id: Number,
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    images: [imageSchema],
    rate_star: Number,
    type: String, ///TYpe: Tour, Hotel, Restaurant
    target_id: Number// toud_id || hotel_id || restaurant_id: doi tuong review

})

reviewSchema.plugin(AutoIncrement, {inc_field: 'idReview'})

module.exports = mongoose.model("Review", reviewSchema)