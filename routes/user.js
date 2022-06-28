const userController = require("../controllers/userControllers");
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get("/",middlewareController.veryfyToken, userController.getAllUsers);
router.delete("/:id",middlewareController.verifyTokenAndAdmin,  userController.deleteUser)

module.exports = router;