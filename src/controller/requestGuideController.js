 
const RequestGuide = require('../models/requestGuidez');
const { sendResponse } = require('../utility/api');

const addRequestGuide = async (req, res) => {
    const { email } = req.body;
    try {
        await RequestGuide.create({ email });
        return sendResponse(res, 201, "Request Guide Added Successfully!");
    } catch (error) {
        return sendResponse(res, 500, `Error adding request guide: ${error.message}`);
    }
};

const getAllRequestGuide = async (req, res) => {
    try {
        const requestGuide = await RequestGuide.find()        
        return sendResponse(res, 200, "All Request Guide fetched successfully", [], requestGuide);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Request Guide: ${error.message}`);
    }
};

const getRequestGuideWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const requestGuide = await RequestGuide.findById(id)
        if (!requestGuide) {
            return sendResponse(res, 404, "Request Guide not found");
        }
        return sendResponse(res, 200, "Request Guide details fetched successfully", [], requestGuide);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Request Guide: ${error.message}`);
    }
};

const deleteRequestGuide = async (req, res) => {
    const { id } = req.params;
    try {
        const requestGuide = await RequestGuide.findById(id);
        if (!requestGuide) {
            return sendResponse(res, 404, "RequestGuide not found");
        }
        await RequestGuide.deleteOne({ _id: id });
        return sendResponse(res, 200, "Request Guide deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting RequestGuide: ${error.message}`);
    }
};


module.exports = {
    addRequestGuide,
    getAllRequestGuide,
    getRequestGuideWithId,
    deleteRequestGuide,
};
