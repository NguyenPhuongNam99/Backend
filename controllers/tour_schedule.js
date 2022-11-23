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
    }
}

module.exports = tourScheduleController;