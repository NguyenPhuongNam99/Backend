const mogoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mogoose);

const userSchema = new mogoose.Schema({
    _id: Number,
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    gender: Boolean,
    phone_number: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    avatar_url: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, {timestamps: true, _id: false})

userSchema.plugin(AutoIncrement);



module.exports = mogoose.model("User", userSchema)