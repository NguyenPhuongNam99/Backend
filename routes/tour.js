const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTour', middlewareController.veryfyToken, tourController.creatTour);
router.put("/updateTour/:id", middlewareController.veryfyToken, tourController.updateTour)
router.delete("/deleteTour/:id", middlewareController.veryfyToken, tourController.deleteTour)
router.get("/getAllTour", middlewareController.veryfyToken, tourController.getAllTour)
router.get("/getTourSchedule/:id", tourController.getTourSchedule);
router.delete("/deleteTourSchedule/:id", tourController.deleteTourSchedule);
router.get("/getTourId", middlewareController.veryfyToken, tourController.getTourId);
router.get("/getAllTourOfCity/:id", tourController.getAllTourOfCity);
router.get("/getTourOfId/:id", middlewareController.veryfyToken, tourController.getTourOfId);
router.get("/getTourPopular", middlewareController.veryfyToken, tourController.getTourPopular);
router.post("/getTourForOptionPerson", middlewareController.veryfyToken, tourController.getTourForOptionPerson);
router.get("/getTourFavouriteOfAllTour/:id", middlewareController.veryfyToken, tourController.getTourFavouriteOfAllTour);


module.exports = router;