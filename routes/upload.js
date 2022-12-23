const upload = require("../controllers/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("upload"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:8000/file/${req.file.filename}`;
  return res.send(imgUrl);
});


module.exports = router;
