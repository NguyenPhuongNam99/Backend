const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTour', middlewareController.veryfyToken, tourController.creatTour);
router.put("/updateTour", middlewareController.veryfyToken, tourController.updateTour)
router.delete("/deleteTour/:id", middlewareController.veryfyToken, tourController.deleteTour)
router.get("/getAllTour", middlewareController.veryfyToken, tourController.getAllTour)
router.get("/getTourSchedule/:id", tourController.getTourSchedule)

module.exports = router;