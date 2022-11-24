const hotelController = require("../controllers/hotelController")
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/createHotel', middlewareController.veryfyToken, hotelController.createHotel);
router.delete('/:id', middlewareController.veryfyToken, hotelController.deleteHotel);
router.put('/updateHotel/:id', middlewareController.veryfyToken, hotelController.updateHotel);
router.get('/getAllHotel', middlewareController.veryfyToken, hotelController.getAllHotel);
router.get('/:id', middlewareController.veryfyToken, hotelController.getID)

module.exports = router;