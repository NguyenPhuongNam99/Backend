const middlewareController = require("../controllers/middlewareController");
const reviewController = require("../controllers/reviewController");

const router = require('express').Router();

router.post("/createRoom", middlewareController.veryfyToken, reviewController.createReview)

module.exports = router;