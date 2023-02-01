const HotelRoomOrder = require('../models/hotel_room_order');

const HotelRoomOrderController = {
    createHotelRoomOrder: async (req, res) => {
        try {
            const { room_name, room_price, room_quantity, room_status, room_description, room_thumbnail, user_id,hotel_id,room_id } = req.body;
            const HotelRoomCreate = await HotelRoomOrder({
                room_name, room_price, room_quantity, room_status, room_description, room_thumbnail, user_id,hotel_id,room_id
            })
            const response = await HotelRoomCreate.save();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllHotelRoomOrder: async (req, res) => {
        try {
            const response = await HotelRoomOrder.find();
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = HotelRoomOrderController