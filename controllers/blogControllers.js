const blog = require('../models/blog');

const blogController = {
    createBlog: async (req, res) => {
        try {
            const {title, thumbnail,description } = req.body;
            const response = await blog({
                title,
                description,
                thumbnail
            }).save();
            res.status(200).json(response)
        } catch (error) {
            res.status(200).json(error)
        }
    },

    getAllBlog: async (req, res) => {
        try {
            const response = await blog.find();
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getIDBlog: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await blog.findOne({_id: id});
            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = blogController;