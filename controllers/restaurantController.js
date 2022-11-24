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
    },

    getAllRestaurant: async (req, res) => {
        try {
            const response = await restaurantModel.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json('ko get duoc du lieu restaurant')
        }
    },

    updateRestaurant: async (req, res) => {
        try {
            
            const {id} = req.params;
            const { name, detail_address, city_id, open_time, close_time, images, price, rate } = req.body;

            await restaurantModel.findOneAndUpdate({idrestaurant: id}, {
                name,
                detail_address,
                city_id,
                open_time,
                close_time,
                images,
                price,
                rate
            }, {new: true})
            res.status(200).json('cap nhat nha hang thanh cong')

        } catch (error) {
            res.status(500).json('cap nhat nha hang loi')
        }
    },

    deleteRestaurant: async (req, res) => {
        try {
            const {id} = req.params;
            await restaurantModel.findByIdAndDelete({_id: id});
            res.status(200).json('xoa nha hang thanh cong');
        } catch (error) {
            res.status(500).json('xoa nha hang that bai')
        }
    }
}


module.exports = restaunrantController;