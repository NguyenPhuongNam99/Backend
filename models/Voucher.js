const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const voucherSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    decription: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    code: String,
    image_url: String,
    price_discount: Number,
    percent_discount: Number,
    price_min_condition: Number,
    price_max_condition: Number,
    quantity: Number,// so luong bao nhieu nguoi dc su dungh hay nhu nao?
    time_start: String,
    time_end: String
}, {_id: false})
voucherSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Voucher", voucherSchema)