const voucherModal = require("../models/Voucher");

const voucherController = {
    
    //lay tat ca du lieu voucher
    getAllVoucher: async (req, res) => {
        try {
            const voucher = await voucherModal.find();
            res.status(200).json(voucher)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //tao voucher
    createVoucher: async (req, res) => {
        try {
            const {
                name, decription, code, 
                image_url, 
                percent_discount, price_min_condition, 
                price_max_condition, quantity, 
                time_start, time_end
            } = 
            req.body;

            const createVoucher = await voucherModal({
                name,
                decription,
                code,
                image_url,
                percent_discount,
                price_min_condition,
                price_max_condition,
                quantity,
                time_start,
                time_end
            })

            const voucher = await createVoucher.save();
            res.status(200).json(voucher)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    //xoa voucher
    deleteVoucher: async(req, res) => {
        try {
            console.log('vao day')
            const response  = await voucherModal.findByIdAndDelete({_id:req.params.id});
            console.log('response new', response)
            res.status(200).json('da xoa voucher');
        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateVoucher: async(req, res) => {
        try {
            const {id} = req.params;
                const {
                name, decription, code, 
                image_url, 
                percent_discount, price_min_condition, 
                price_max_condition, quantity, 
                time_start, time_end
            } = 
            req.body;

         const response =  await voucherModal.findOneAndUpdate({_id: id}, {
                name,decription,
                code,
                image_url,
                percent_discount,
                price_min_condition,
                price_max_condition,
                quantity,
                time_start,
                time_end

            },{new: true})

            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUserId: async (req, res) => {
        try {
            const response = await voucherModal.findOne({_id: req.params.id})
            res.status(200).json(response);
            console.log('response new', response);
        } catch (error) {
            console.log('error new', error)
        }
    }


}

module.exports = voucherController;