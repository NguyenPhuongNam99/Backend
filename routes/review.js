const reviewController = require('../controllers/reviewController');
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/review', middlewareController.veryfyToken, reviewController.createReview)
router.delete('/review/:id', middlewareController.veryfyToken, reviewController.deleteReview)
router.get('/getAll', middlewareController.veryfyToken, reviewController.getAllReview)
router.put('/updateReview/:id', middlewareController.veryfyToken, reviewController.updateReview)

module.exports = router;