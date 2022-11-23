const roomModel = require('../models/rooom');

const roomControler = {
    createRoom: async ( req, res) => {
        try {
            const {hotel_id, room_number, floor, price, capacity} = req.body;
            const response = await new roomModel({
                hotel_id,
                room_number,
                floor,
                price,
                capacity
            }).save();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = roomControler;