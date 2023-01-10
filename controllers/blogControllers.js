const blog = require('../models/blog');

const blogController = {
    createBlog: async (req, res) => {
        try {
            const {name, thumbnail,decription } = req.body;
            const response = await blog({
                name,
                decription,
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