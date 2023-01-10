const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: String,
    decription: String,
    thumbnail: String
})

module.exports = mongoose.model("blog", blogSchema)