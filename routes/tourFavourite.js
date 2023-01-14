const tourFavouriteController = require("../controllers/tourFavouriteController");
const middlewareController = require("../controllers/middlewareController");

const router = require('express').Router();

router.post('/createTourFavourite', middlewareController.veryfyToken, tourFavouriteController.createTourFavourite);

module.exports = router;