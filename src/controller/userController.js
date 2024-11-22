const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');

dotenv.config();

const hashPassword = async (password) => bcrypt.hash(password, 10);
const findUserByEmail = async (email) => User.findOne({ email });

const createAdmin = async () => {
    try {
        const adminExists = await findUserByEmail('admin@admin.com');
        if (adminExists) {
            console.log("Admin already exists");
            return;
        }
        const hashedPassword = await hashPassword('admin123');
        const admin = new User({ name: 'Test Admin', email: 'admin@admin.com', password: hashedPassword });
        await admin.save();
        console.log("Admin created successfully");
    } catch (error) {
        console.error("Error creating admin:", error);
    }
};

const registerUser = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return sendResponse(res, 400, "User already exists");
        }
        const existingPhone = await User.find({ phone: phone });
        if (existingPhone && existingPhone.length) {
            return sendResponse(res, 400, "Phone Number already in use please try another one.");
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword, phone, gender });
        return sendResponse(res, 201, "User Created Successfully", [], newUser);
    } catch (error) {
        return sendResponse(res, 500, `Error creating user: ${error.message}`);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' });
        // res.cookie("token", token, { httpOnly: true });
        const response = {
            user: user,
            access_token: token
        }
        return sendResponse(res, 200, "Login Successful", [], response);
    } catch (error) {
        return sendResponse(res, 500, `Error during login: ${error?.message}`, [], error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ email: { $ne: req.user.email } })
        return sendResponse(res, 200, "Users fetched successfully", [], users);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching users: ${error.message}`);
    }
};

const getUserWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User details fetched successfully", [], user);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching user: ${error.message}`);
    }
};

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, gender } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, gender, phone }, { new: true, runValidators: true });
        if (!updatedUser) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User updated successfully", [], updatedUser);
    } catch (error) {
        return sendResponse(res, 500, `Error updating user: ${error.message}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        await User.deleteOne({ _id: id });
        return sendResponse(res, 200, "User deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting user: ${error.message}`);
    }
};

module.exports = {
    createAdmin,
    registerUser,
    loginUser,
    getAllUsers,
    getUserWithId,
    editUser,
    deleteUser,
};
