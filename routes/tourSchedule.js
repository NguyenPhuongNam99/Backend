const middlewareController = require("../controllers/middlewareController");
const tour_schedule = require("../controllers/tour_schedule");

const router = require('express').Router();

router.post('/createTourSchedule', middlewareController.veryfyToken, tour_schedule.createTourSchedule)

module.exports = router;