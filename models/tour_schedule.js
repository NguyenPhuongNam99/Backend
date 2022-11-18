const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const detailTourScheduleSchema = mongoose.Schema({
    _id: Number,
    image_url: String,
    name: String,
    timeStart: String,
    visitTime: String,
    price: Number,
    detail_address: String,
    description: String
}, {_id: false})

detailTourScheduleSchema.plugin(AutoIncrement)

//bang chi tiet dia diem se di trong tour
const tourScheduleSchema = mongoose.Schema({
    _id: Number,
    tour_id: Number,
    detail: [detailTourScheduleSchema] //chi tiết lịch trình theo từng ngày (array)
  //ex: [
  // { "image_url": "http://image",
  //      "name" : "Thăm quan Hải Phòng",
  //      "timeStart" : "20h",
  //      "visitTime" : "120p",
  //      "price" : "0",
  //      "detail_address" : "Hải Phòng",
  //      "description" : "Mô tả điểm đến thăm quan"},
  // { "image_url": "http://image",
  //      "name" : "Thăm quan biển Đồ Sơn"
  //      "timeStart" : "23h"
  //      "visitTime" : "120p",
  //      "price" : "1000000",
  //      "detail_address" : "Đồ Sơn, Hải Phòng",
  //      "description" : "Thăm và động viên các em gái có hoàn cảnh khó khăn =)))))"},
  //...
  //]
}, {_id: false})
module.exports = mongoose.model("TourSchedule", tourScheduleSchema);


//man dang ky
    //2 o checkbox 1 user (mac dinh) ., 2 la agency(nha cung cap)

//man dnag nhap 
    // ==> khi dang nhap check role user

// admin
    // ==> phe duyet hay ko phe duyet tour
    //dua vao danh gia de co the khoa tour ==> isboolen
//nha phan phoi
    //them sua xoa tour