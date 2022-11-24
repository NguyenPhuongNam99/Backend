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
    },

    getAllRoom: async (req, res) => {
        try {
            
            const response = await roomModel.find();
            res.status(200).json(response);

        } catch (error) {
            
            res.status(500).json(error)
        }
    },

    deleteRoom: async (req, res) => {
        try {
            
            const {id} = req.params;
            await roomModel.findByIdAndDelete({_id: id});
            res.status(200).json('xoa phong thanh cong');

        } catch (error) {
            res.status(500).json('xoa phong that bai')
        }
    },

    updateRoom: async (req, res) => {
        try {
            
            const {id} = req.params;
            const {hotel_id, room_number, floor, price, capacity} = req.body;
            await roomModel.findOneAndUpdate({idRoom: id}, {
                hotel_id,
                room_number,
                floor,
                price,
                capacity
            }, {new: true})
            
            res.status(200).json('cap nhat thanh cong')

        } catch (error) {
            res.status(500).json('cap nhat that bai')
        }
    }
}

module.exports = roomControler;