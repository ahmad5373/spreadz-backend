const express = require('express');
const { protected } = require('../middlewares/auth');
const { createBlogs, getAllBlogs, getblogsWithId, editBlogs, deleteBlogs } = require('../controller/blogController');
const { createBlogValidation, requestValidation } = require('../validations');

const router = express.Router();

router.post('/create-blogs',protected, createBlogValidation, requestValidation, createBlogs);
router.get('/get-blogs',  getAllBlogs);
router.get('/:id',   getblogsWithId);
router.put('/:id', protected, editBlogs);
router.delete('/:id',protected, deleteBlogs);

module.exports = router;
