const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const voucherLogSchema = new mongoose.Schema({
    _id: Number,
    voucher_id: Number,
    user_id: Number,
    order_tour_id: Number,


}, {_id: false})

voucherLogSchema.plugin(AutoIncrement)
module.exports = mongoose.model("VoucherLog", voucherLogSchema)