const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTour', middlewareController.veryfyToken, tourController.creatTour);
router.put("/updateTour", middlewareController.veryfyToken, tourController.updateTour)
router.delete("/deketeTour/:id", middlewareController.veryfyToken, tourController.deleteTour)
router.get("/getAllTour", middlewareController.veryfyToken, tourController.getAllTour)

module.exports = router;