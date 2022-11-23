const Hotel = require('../models/hotel');

const hotelController = {
    createHotel: async (req, res) => {
        try {
          const  {name, image, description, type, city_id, district_id, rate, detail_address} = req.body;
            const hotelcreate = await new Hotel({
                name,
                image,
                description,
                type,
                city_id,
                district_id,
                rate,
                detail_address
            });

            const response = await hotelcreate.save();
            res.status(200).json(response);
        } catch (error) {
            console.log('error hotel create', error);
            res.status(500).json(error)
        }
    }
}

module.exports = hotelController;