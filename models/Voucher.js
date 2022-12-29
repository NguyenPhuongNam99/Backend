const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const voucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    decription: {
        type: String,
        required: true,
        minlength: 3,    
    },
    code: String,
    image_url: String,
    percent_discount: Number,
    price_min_condition: Number,
    price_max_condition: Number,
    quantity: Number,// so luong bao nhieu nguoi dc su dungh hay nhu nao?
    time_start: String,
    time_end: String,
})
voucherSchema.plugin(AutoIncrement, {inc_field: 'idVoucher'});

module.exports = mongoose.model("Voucher", voucherSchema)