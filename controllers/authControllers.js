const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    //REGISTER

    registerUser: async (req, res) => {

        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const { first_name, email, last_name, gender, phone_number, avatar_url, role, status } = req.body;
            //create new user
            const newUser = await new User({
                first_name: first_name,
                email: email,
                password: hashed,
                last_name: last_name,
                gender: gender,
                phone_number: phone_number,
                avatar_url: avatar_url,
                role: role,
                status: status,
                username: req.body.username
            })
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //generat accestoken
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        }, "secretkey", {
            expiresIn: "30s"
        })
    },

    //login 
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json("wrong username")
            }
            const isPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!isPassword) {
                res.status(404).json("wrong password")
            }
            if (user && isPassword) {
                const accesToken = authController.generateAccessToken(user);

                const refreshToken = jwt.sign({
                    id: user.id,
                    admin: user.admin,
                }, 'refreshToken', {
                    expiresIn: '365d'
                })
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    // sameSite: "strict",
                })
                const { password, ...other } = user._doc;
                res.status(200).json({ ...other, accesToken, refreshToken });
            }
        } catch (error) {

        }
    },
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        // res.status(200).json('refhes token')
        if (!refreshToken) {
            res.status(401).json('you are not auth')
            return false;

        }
        jwt.verify(refreshToken, "refreshToken", (err, user) => {
            if (err) {
                res.status(404).json('loi')
                return false;
            } else {
                // const newAccestoken = authController.generateAccessToken(user);
                // const newrefreshToken = jwt.sign({
                //     id: user.id,
                //     admin: user.admin,
                // }, 'refreshToken', {
                //     expiresIn: '2d'
                // })
                // res.cookie("refreshToken", newrefreshToken, {
                //     httpOnly: true,
                //     secure: false,
                //     path: "/",
                //     sameSite: "strict",
                // })
                // res.status(200).json({accesToken: newAccestoken})
                return true;
                // res.status(200).json({accesToken: newAccestoken})
            }
        })
    }
}
module.exports = authController;