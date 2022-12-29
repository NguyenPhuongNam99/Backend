const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTour', middlewareController.veryfyToken, tourController.creatTour);
router.put("/updateTour/:id", middlewareController.veryfyToken, tourController.updateTour)
router.delete("/deleteTour/:id", middlewareController.veryfyToken, tourController.deleteTour)
router.get("/getAllTour", middlewareController.veryfyToken, tourController.getAllTour)
router.get("/getTourSchedule/:id", tourController.getTourSchedule);
router.delete("/deleteTourSchedule/:id", tourController.deleteTourSchedule);
router.get("/getTourId", middlewareController.veryfyToken, tourController.getTourId)

module.exports = router;