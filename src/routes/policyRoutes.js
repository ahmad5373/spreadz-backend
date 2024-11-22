const express = require('express');
const { getPolicy, addPolicy } = require('../controller/policyController');
const router = express.Router();

router.get('/:type', getPolicy);

router.post('/:type', addPolicy);

module.exports = router;
