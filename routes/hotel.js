const hotelController = require("../controllers/hotelController")
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/createHotel', middlewareController.veryfyToken, hotelController.createHotel);

module.exports = router;