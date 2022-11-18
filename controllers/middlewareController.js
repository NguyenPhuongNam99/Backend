const jwt = require('jsonwebtoken');
const userController = require("../controllers/authControllers");


const middlewareController = {
    veryfyToken: (req, res, next) => {

        const token = req.headers;
        if (token) {
            const accesToken = token.authorization.split(" ")[1];
            jwt.verify(accesToken, 'secretkey', (err, user) => {

                if (err) {
                    if (err.message == 'jwt expired') {
                        const temp = userController.requestRefreshToken(req, res, next);
                        if (temp) {
                            next();
                        } else {
                            res.status(403).json('loi r')
                        }
                        // res.status(403).json(err.message)
                    } else {
                        res.status(403).json('token is not')
                    }

                } else {
                    next();
                }

            })
        } else {
            res.status(401).json('you are not auth222')
        }
    },

    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.veryfyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json('you are not allow');
            }
        })
    }
}

module.exports = middlewareController;