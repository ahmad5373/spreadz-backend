const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const {ContactUs , Newsletter} = require('../models/contactUs');
dotenv.config();


const createMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        await ContactUs.create({ name, email, phone, message });
        return sendResponse(res, 201, "your message sent successfully our team will reach out to you shortly!");
    } catch (error) {
        return sendResponse(res, 500, `Error creating user: ${error.message}`);
    }
};


const getAllMessage = async (req, res) => {
    try {
        const messages = await ContactUs.find()
        return sendResponse(res, 200, "All contact us Messages fetched successfully", [], messages);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching messages: ${error.message}`);
    }
};

const getMessageWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await ContactUs.findById(id)
        if (!message) {
            return sendResponse(res, 404, "message not found");
        }
        return sendResponse(res, 200, "message details fetched successfully", [], message);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching message: ${error.message}`);
    }
};

const editMessage = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNo, message } = req.body;
    try {
        const updateMessage = await ContactUs.findByIdAndUpdate(id, { message }, { new: true, runValidators: true });
        if (!updateMessage) {
            return sendResponse(res, 404, "Message not found");
        }
        return sendResponse(res, 200, "Message updated successfully", [], updateMessage);
    } catch (error) {
        return sendResponse(res, 500, `Error updating Message: ${error.message}`);
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await ContactUs.findById(id);
        if (!message) {
            return sendResponse(res, 404, "Message not found");
        }
        await ContactUs.deleteOne({ _id: id });
        return sendResponse(res, 200, "Message deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting Message: ${error.message}`);
    }
};



const subscribeNewsLetter = async (req, res) => {
    const { email } = req.body;
    try {
        await Newsletter.create({ email });
        return sendResponse(res, 201, "your email recieved you'll be informed about the latest investor updates!");
    } catch (error) {
        return sendResponse(res, 500, `Error Subscribing news letter: ${error.message}`);
    }
};


const getAllNewsLetter = async (req, res) => {
    try {
        const newsletter = await Newsletter.find();
        console.log("newsletter =>", newsletter);
        return sendResponse(res, 200, "All News Letter fetched successfully", [], newsletter);
    } catch (error) {
        console.log("error =>", error);
        return sendResponse(res, 500, `Error fetching News Letter: ${error.message}`);
    }
};

module.exports = {
    createMessage,
    getAllMessage,
    getMessageWithId,
    editMessage,
    deleteMessage,
    subscribeNewsLetter,
    getAllNewsLetter,
};
