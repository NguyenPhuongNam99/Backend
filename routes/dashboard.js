const User = require('../models/User');
const tour = require('../models/tour');
const hotel = require('../models/hotel');
const blog = require('../models/blog');
const Voucher = require('../models/Voucher');
const restaunrant = require('../models/restaurant')

const router = require('express').Router();

router.get('/getDashboard', async (req, res) => {
    try {

        const user = await User.find();
        const userHdv = await User.find({role: 'hdv'});
        const tourResponse = await tour.find();
        const hotelResponse = await hotel.find();
        const blogResponse = await blog.find();
        const restaunrantResponse = await restaunrant.find();
        const voucherResponse = await Voucher.find()

        const response ={
            userData: user.length,
            hdvData: userHdv.length,
            tourData: tourResponse.length,
            hotelData: hotelResponse.length,
            blogData: blogResponse.length,
            restaunrantData: restaunrantResponse.length,
            voucherData:voucherResponse.length
        }
        console.log('res', response)
        res.status(200).json(response)        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/getAllHDV', async (req, res) => {
    try {
        
        const userHdv = await User.find({role: 'hdv'});
        res.status(200).json(userHdv)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;