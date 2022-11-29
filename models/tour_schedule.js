const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const detailTourScheduleSchema = new mongoose.Schema({
    image_url: String,
    name: String,
    timeStart: String,
    visitTime: String,
    price: Number,
    detail_address: String,
    description: String
})


//bang chi tiet dia diem se di trong tour
const tourScheduleSchema = new mongoose.Schema({
    tour_id: Number,
    detail: [detailTourScheduleSchema] //chi tiết lịch trình theo từng ngày (array)
    
},{inc_field: 'idTourSchedule'})
module.exports = mongoose.model("TourSchedule", tourScheduleSchema);
