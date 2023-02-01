const hotel_room_order = require('../controllers/hotelRoomOrderController');
const middlewareController = require('../controllers/middlewareController')

const router = require('express').Router();

router.post('/createHotelRoomOrder', middlewareController.veryfyToken, hotel_room_order.createHotelRoomOrder);
router.get('/getAllHotelRoomOrder', middlewareController.veryfyToken, hotel_room_order.getAllHotelRoomOrder)


module.exports =router;