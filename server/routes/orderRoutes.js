const express = require('express')
const formidable = require('express-formidable');
const { sendOrderMessage } = require('../controllers/orderController');

const router = express.Router()

router.post("/sendMessage", sendOrderMessage)

module.exports = router