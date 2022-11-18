const express = require('express')
const router = express.Router()
const authController = require("../controllers/authControllers");

router.post("/register",  authController.registerUser)

router.post("/login", authController.LoginUser)
// router.post("/refesh", authController.requestRefreshToken)

module.exports = router;