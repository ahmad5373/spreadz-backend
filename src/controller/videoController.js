const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const Video = require('../models/video');
dotenv.config();


const addVideo = async (req, res) => {
    const { title, url } = req.body;
    try {
        await Video.create({ title, url });
        return sendResponse(res, 201, "Video added successfully!");
    } catch (error) {
        return sendResponse(res, 500, `Error creating Video: ${error.message}`);
    }
};


const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()        
        return sendResponse(res, 200, "All Videos fetched successfully", [], videos);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Video: ${error.message}`);
    }
};

const getVideoWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id)
        if (!video) {
            return sendResponse(res, 404, "video not found");
        }
        return sendResponse(res, 200, "Video details fetched successfully", [], video);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Video: ${error.message}`);
    }
};

const editVideo = async (req, res) => {
    const { id } = req.params;
    const {title, url} = req.body;
    try {
        const updateVideo = await Video.findByIdAndUpdate(id, { title , url}, { new: true, runValidators: true });
        if (!updateVideo) {
            return sendResponse(res, 404, "Video not found");
        }
        return sendResponse(res, 200, "Video updated successfully", [], updateVideo);
    } catch (error) {
        return sendResponse(res, 500, `Error updating Video: ${error.message}`);
    }
};

const deleteVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return sendResponse(res, 404, "Video not found");
        }
        await Video.deleteOne({ _id: id });
        return sendResponse(res, 200, "Video deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting Video: ${error.message}`);
    }
};

module.exports = {
    addVideo,
    getAllVideos,
    getVideoWithId,
    editVideo,
    deleteVideo,
};
