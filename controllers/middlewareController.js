const jwt = require('jsonwebtoken');

const middlewareController = {
    veryfyToken: (req, res, next) => {

        const token = req.headers.authorization;
        console.log('token new', token)
        if (token) {
            const accesToken = token.split(" ")[1];
            jwt.verify(accesToken, 'secretkey', (err, user) => {
                if (err) {
                    res.status(403).json('token is not')
                }else{
                    req.user = user
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