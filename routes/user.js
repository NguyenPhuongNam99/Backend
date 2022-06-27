const userController = require("../controllers/userControllers");

const router = require('express').Router();

router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser)

module.exports = router;