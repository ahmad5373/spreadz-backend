const express = require('express');
const {  requestValidation,  createMessageValidation } = require('../validations');
const { createMessage, getAllMessage, getMessageWithId, editMessage, deleteMessage } = require('../controller/contactUsController');
const { protected } = require('../middlewares/auth');

const router = express.Router();

router.post('/add-message', createMessageValidation, requestValidation, createMessage);
router.get('/get-message', protected, getAllMessage);
router.get('/:id', protected, getMessageWithId);
router.put('/:id', protected, editMessage);
router.delete('/:id', protected, deleteMessage);

module.exports = router;
