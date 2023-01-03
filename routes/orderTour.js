const orderController = require('../controllers/orderTour');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/createOrderTour', middlewareController.veryfyToken, orderController.createOrderTour);
router.get('/getAllOrderTour', middlewareController.veryfyToken, orderController.getAllOrderTour);
router.delete('/deleteOrderTour/:id', middlewareController.veryfyToken, orderController.deleteOrderTour);
router.put('/updateOrderTour/:id', middlewareController.veryfyToken, orderController.updateOrderTour);
router.get('/getOrderID/:id', middlewareController.veryfyToken, orderController.getOrderID);
router.put('/onlyUpdateOrderTour/:id', middlewareController.veryfyToken, orderController.onlyUpdateOrderTour);
router.get('/getOrderTourOfIdHDV/:id', middlewareController.veryfyToken, orderController.getOrderTourOfIdHDV);

module.exports = router;