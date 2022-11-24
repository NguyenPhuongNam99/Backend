const tour_schedule = require('../models/tour_schedule')

const tourScheduleController = {
    createTourSchedule: async (Req, res) => {
        try {
            
            const {tour_id, detail} = req.body;
            const response = new tour_schedule({
                tour_id,
                detail
            }).save();
            res.status(200).json(response)

        } catch (error) {
            res.status(500),json(error)
        }
    },

    getALLTourSchedule: async (req, res) => {
        try {
            
            const response = await tour_schedule.find();
            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteTourSchedule: async (req, res) => {
        try {
            
            const { id } = req.params;
            await tour_schedule.findByIdAndDelete({_id: id})
            res.status(200).json("delete thanh cong")

        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateTourSchedule: async (req, res) => {
        try {
            
            const {id} = req.params;
            const {tour_id, detail} = req.body;
            
            await tour_schedule.findOneAndUpdate({idTourSchedule: id}, {
                tour_id,
                detail
            })

            res.status(200).json('cap nhat thanh cong')

        } catch (error) {
            res.status(500).json('cap nhat that bai')
        }
    }
}

module.exports = tourScheduleController;