const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const citySchema = new mongoose.Schema({
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
    }
}, {timestamps: true, _id: false})
citySchema.plugin(AutoIncrement)

module.exports = mongoose.model("City", citySchema);