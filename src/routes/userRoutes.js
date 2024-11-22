const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, editUser, getUserWithId } = require('../controller/userController');
const { protected } = require('../middlewares/auth');
const { createUserValidation, requestValidation, loginValidation } = require('../validations');

const router = express.Router();

router.post('/register', createUserValidation, requestValidation, registerUser);
router.post('/login', loginValidation, requestValidation, loginUser);
router.get('/', protected,  getAllUsers);
router.get('/:id', protected,  getUserWithId);
router.put('/:id', protected,  editUser);
router.delete('/:id', protected,  deleteUser);

module.exports = router;
