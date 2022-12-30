const cityController = require('../controllers/cityController');
const middlewareController = require('../controllers/middlewareController')

const router = require('express').Router();

router.post('/createCity',middlewareController.veryfyToken, cityController.createCity);
router.delete('/deleteCity/:id',middlewareController.veryfyToken, cityController.deleteCity);
router.get('/getAllCity',middlewareController.veryfyToken, cityController.getAllCity);
router.get('/getCity/:id',middlewareController.veryfyToken, cityController.getDistrictofCity);
router.get('/getDataDistrict/:id',middlewareController.veryfyToken, cityController.getDataDistrict);

module.exports = router;