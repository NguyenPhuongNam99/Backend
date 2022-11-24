const middlewareController = require("../controllers/middlewareController");
const tour_schedule = require("../controllers/tour_schedule");

const router = require('express').Router();

router.post('/createTourSchedule', middlewareController.veryfyToken, tour_schedule.createTourSchedule)
router.get('/getAllTourSchedule', middlewareController.veryfyToken, tour_schedule.getALLTourSchedule)
router.put('/updateTourSchedule/:id', middlewareController.veryfyToken, tour_schedule.updateTourSchedule)
router.delete('/deleteTourSchedule/:id', middlewareController.veryfyToken, tour_schedule.deleteTourSchedule)

module.exports = router;