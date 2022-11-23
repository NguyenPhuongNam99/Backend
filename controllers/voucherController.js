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
                image_url, price_discount, 
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
                price_discount,
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
            console.log('req voucher', req.params.id)
            const response  = await voucherModal.findAndDelete({id:req.params.id});
            console.log('response oucher', response)
            res.status(200).json('da xoa voucher');
        } catch (error) {
            console.log('error delete', error)
            res.status(500).json(error)
        }
    }


}

module.exports = voucherController;