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


const detailTourScheduleSchema = new mongoose.Schema({
    day: String,
    schedule: [detailScheduleSchema]
})


//bang chi tiet dia diem se di trong tour
const tourScheduleSchema = new mongoose.Schema({
    tour_id: Number,
    detail: [detailTourScheduleSchema] //chi tiết lịch trình theo từng ngày (array)
    
},{inc_field: 'idTourSchedule'})
module.exports = mongoose.model("TourSchedule", tourScheduleSchema);
