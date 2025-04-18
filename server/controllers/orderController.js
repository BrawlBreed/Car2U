const orderModel = require("../models/orderModel")
const { sendMail } = require("../smtp/mailer")

const sendOrderMessage = async (req,res) => {
    try{
        await sendMail(req.body.form)

        res.status(201).send({
            success:true,
            message:'Order message sent successfully!'
        })
    }catch(err){
        console.log('Failed to send the order message',err);
        res.status(500).send({
            success:false,
            message:'Failed to send the order message',
            err
        })
    }
}

module.exports = {
    sendOrderMessage
};