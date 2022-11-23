const orderController = require('../controllers/orderTour');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/createOrderTour', middlewareController.veryfyToken, orderController.createOrderTour);
router.get('/getAllOrderTour', middlewareController.veryfyToken, orderController.getAllOrderTour);

module.exports = router;