const tourFavourite = require("../models/tourFavorite");

const tourFavouriteController = {

    createTourFavourite: async (req, res) => {
        try {
            const {user_id, tour_id, _idTour} = req.body;

            const response = await new tourFavourite({
                user_id, tour_id, _idTour
            }).save();

            console.log('response', response);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = tourFavouriteController;