const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTour', middlewareController.veryfyToken, tourController.creatTour);

module.exports = router;