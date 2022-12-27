const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const detailScheduleSchema = new mongoose.Schema({
    day: String,
    description: String,
    door_price: Number,
    location: String,
    thumbnail: String,
    time_end: String,
    time_start: String
})


//bang chi tiet dia diem se di trong tour
const tourScheduleSchema = new mongoose.Schema({
    
    day: String,
    schedule: [detailScheduleSchema],
    tour_id: Number,
    
})

module.exports = mongoose.model("TourSchedule", tourScheduleSchema);
