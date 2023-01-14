const mongoose = require("mongoose");


const tourFavouriteSchema = new mongoose.Schema({
    user_id: String,
    tour_id: String,
    _idTour: String,
})

module.exports = mongoose.model('tourFavouritr', tourFavouriteSchema)