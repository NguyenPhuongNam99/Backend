const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    //REGISTER

    registerUser: async(req, res) => {
            console.log('pas new', req.body.password);

        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            })
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            console.log('err new', error);
            res.status(500).json(error);
        }
    },

    //login 
    LoginUser: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
                res.status(404).json("wrong username")
            }
            const isPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!isPassword){
                res.status(404).json("wrong password")
            }
            if(user && isPassword){
              const accesToken = jwt.sign({
                    id: user.id,
                    admin: user.admin
                }, "secretkey", {
                    expiresIn: "2h"
                } )
                res.status(200).json({user, accesToken});
            }
        } catch (error) {
            
        }
    }
}
module.exports = authController;