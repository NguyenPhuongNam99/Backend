const mogoose = require("mongoose");

const userSchema = new mogoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
module.exports = mogoose.model("User", userSchema)