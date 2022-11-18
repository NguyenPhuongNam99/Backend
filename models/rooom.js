const mongoose = require('mongoose');

const roomHotel = new mongoose.Schema({
    _id: Number,
    hotel_id: Number,
    room_number: Number,
    floor: Number,
    price: Number,
    capacity: Number,
    is_available: Boolean
}, {
    _id: false
})

module.exports = mongoose.model("RoomHotel", roomHotel)

//y tuong: khi them moi hotel ==. se phai tao them phong