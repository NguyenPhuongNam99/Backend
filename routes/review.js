const reviewController = require('../controllers/reviewController');
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/review', middlewareController.veryfyToken, reviewController.createReview)

module.exports = router;