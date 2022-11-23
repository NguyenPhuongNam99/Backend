const reviewModel = require("../models/review");

const reviewController = {

    createReview: async (req, res) => {
        try {
            const { user_id, content, images, rate_star, type, target_id } = req.body;

        const response = new reviewModel({
            user_id,
            content,
            images,
            rate_star,
            type,
            target_id
        }).save();
        console.log('response', response);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = reviewController;
