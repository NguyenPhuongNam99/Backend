const middlewareController = require("../controllers/middlewareController");
const roomControler = require("../controllers/roomController");

const router = require('express').Router();

router.post("/createRoom", middlewareController.veryfyToken, roomControler.createRoom)
router.delete("/deleteRoom/:id", middlewareController.veryfyToken, roomControler.deleteRoom)
router.put("/updateRoom/:id", middlewareController.veryfyToken, roomControler.updateRoom)
router.get("/getAllRoom", middlewareController.veryfyToken, roomControler.getAllRoom)

module.exports = router;