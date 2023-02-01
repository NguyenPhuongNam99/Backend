const mongoose = require('mongoose');
const hotel_roomOrderSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true,
        unique: true,
      },
      room_price: String,
      room_quantity: Number,
      room_status: String,
      room_description: String,
      room_thumbnail: String,
      user_id: String,
      hotel_id: String,
      room_id: String
})

module.exports = mongoose.model('hotelRoomOrder', hotel_roomOrderSchema);