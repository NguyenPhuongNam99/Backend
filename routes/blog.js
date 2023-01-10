const blogController = require('../controllers/blogControllers');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/createBlog', middlewareController.veryfyToken, blogController.createBlog);
router.get('/getAllBlog', middlewareController.veryfyToken, blogController.getAllBlog)
router.get('/getIDBlog/:id', middlewareController.veryfyToken, blogController.getIDBlog)

module.exports = router;