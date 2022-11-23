const restaurantModel = require("../models/restaurant");

const restaunrantController = {
    createRestaurant: async (req, res) => {
        try {
            const { name, detail_address, city_id, open_time, close_time, images, price, rate } = req.body;
            const restaurantCreate = await new restaurantModel({
                name,
                detail_address,
                city_id, 
                open_time,
                close_time, images,
                price,
                rate
            }).save();
            console.log('response restaunrant', restaurantCreate);
            res.status(200).json('tao thanh cong')
        
        } catch (error) {
            console.log('error restaurant', error);
            res.status(500).json(error)
        }
    }
}


module.exports = restaunrantController;