const express = require('express');
const { checkOutSession } = require('../controller/subscriptionController');

const router = express.Router();

router.post('/create-checkout-session',  checkOutSession);


module.exports = router;