const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const districtSchema = new mongoose.Schema({
    _id: Number,
    district_name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    city_id: Number
}, { _id: false })
districtSchema.plugin(AutoIncrement);


module.exports = mongoose.model("District", districtSchema);