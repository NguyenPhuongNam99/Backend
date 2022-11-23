const restaunrantController = require("../controllers/restaurantController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createRestaurant', middlewareController.veryfyToken, restaunrantController.createRestaurant);


module.exports = router;