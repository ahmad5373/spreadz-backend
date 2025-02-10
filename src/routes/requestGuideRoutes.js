const express = require('express');
const { protected } = require('../middlewares/auth');
const { requestValidation,  requestGuideValidation } = require('../validations');
const { addRequestGuide, getAllRequestGuide, getRequestGuideWithId, deleteRequestGuide } = require('../controller/requestGuideController');

const router = express.Router();

router.post('/add-request-guide', requestGuideValidation, requestValidation, addRequestGuide);
router.get('/',  getAllRequestGuide);
router.get('/:id', protected,   getRequestGuideWithId);
router.delete('/:id', deleteRequestGuide);


module.exports = router;
