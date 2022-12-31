const userController = require("../controllers/userControllers");
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get("/getAllUsers",middlewareController.veryfyToken, userController.getAllUsers);
router.delete("/:id",middlewareController.verifyTokenAndAdmin,  userController.deleteUser);
router.get("/userId/:id", middlewareController.veryfyToken, userController.getUserId);
router.put("/updateUser/:id", middlewareController.veryfyToken, userController.updateUserInfo);

module.exports = router;