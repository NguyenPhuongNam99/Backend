const restaunrantController = require("../controllers/restaurantController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createRestaurant', middlewareController.veryfyToken, restaunrantController.createRestaurant);
router.delete('/deleteRestaurant/:id', middlewareController.veryfyToken, restaunrantController.deleteRestaurant);
router.get('/getAllRestaurant' restaunrantController.getAllRestaurant);
router.put('/updateRestaurant/:id', middlewareController.veryfyToken, restaunrantController.updateRestaurant)


module.exports = router;