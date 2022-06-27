const User = require("../models/User");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            //v1//user/123
            const user = await User.findById(req.params.id);
            //findbyid la tim user
            //findbyidanddelete laf tim va xoa
           if(user){
             res.status(200).json('da xoa thanh cong')
           }
        } catch (error) {
            res.status(500).json(error);

        }
    }
}

module.exports = userController;