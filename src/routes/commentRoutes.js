const express = require('express');
const { protected } = require('../middlewares/auth');
const { requestValidation, addCommentValidation } = require('../validations');
const { addComment } = require('../controller/commentController');

const router = express.Router();

router.post('/add-comment',protected, addCommentValidation, requestValidation, addComment);

module.exports = router;
