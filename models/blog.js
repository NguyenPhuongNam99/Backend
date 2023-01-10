const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String
})

module.exports = mongoose.model("blog", blogSchema)