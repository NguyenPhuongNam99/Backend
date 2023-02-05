const hotelController = require("../controllers/hotelController")
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get('/getType', middlewareController.veryfyToken,  hotelController.getHotelType);
router.get('/fill', hotelController.getAllRoomForUseId);
router.get('/fill', hotelController.confirmRoomStatus);
router.get('/getHomeStayType',middlewareController.veryfyToken ,hotelController.getHomeStayType);
router.post('/createHotel', middlewareController.veryfyToken, hotelController.createHotel);
router.delete('/:id', middlewareController.veryfyToken, hotelController.deleteHotel);
router.put('/updateHotel/:id', middlewareController.veryfyToken, hotelController.updateHotel);
router.get('/getAllHotel', middlewareController.veryfyToken, hotelController.getAllHotel);
router.get('/:id', middlewareController.veryfyToken, hotelController.getID);
router.put('/updateOneProperty/:id', middlewareController.veryfyToken, hotelController.updateOneProperty);
router.put('/updateRoomStatus', middlewareController.veryfyToken, hotelController.updateRoomStatus);
router.put('/updateRoomStatusAndDeleteHotelOrder', middlewareController.veryfyToken, hotelController.updateRoomStatusAndDeleteHotelOrder);
router.get('/getRoomofId/:id', middlewareController.veryfyToken, hotelController.getRoomofId);

module.exports = router;