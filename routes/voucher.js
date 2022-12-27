const voucherController = require("../controllers/voucherController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createVoucher', middlewareController.veryfyToken, voucherController.createVoucher);
router.get('/getAllVoucher', middlewareController.veryfyToken, voucherController.getAllVoucher);
router.delete('/:id', middlewareController.veryfyToken,voucherController.deleteVoucher);
router.put('/getvoucher/:id', middlewareController.veryfyToken,voucherController.updateVoucher);
router.get('/getUserId/:id', middlewareController.veryfyToken, voucherController.getUserId)


module.exports = router;