const express = require('express');
const {  requestValidation,  createMessageValidation, subscribeNewsletterValidation } = require('../validations');
const { createMessage, getAllMessage, getMessageWithId, editMessage, deleteMessage, getAllNewsLetter, subscribeNewsLetter } = require('../controller/contactUsController');
const { protected } = require('../middlewares/auth');

const router = express.Router();

router.post('/subscribe-newsletter', subscribeNewsletterValidation, requestValidation, subscribeNewsLetter);
router.get('/get-newsletter', protected, getAllNewsLetter);

router.post('/add-message', createMessageValidation, requestValidation, createMessage);
router.get('/get-message', protected, getAllMessage);
router.get('/:id', protected, getMessageWithId);
router.put('/:id', protected, editMessage);
router.delete('/:id', protected, deleteMessage);

module.exports = router;
