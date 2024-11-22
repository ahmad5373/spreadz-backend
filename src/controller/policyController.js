const { sendResponse } = require('../utility/api');
const policy = require('../models/policy');


const getPolicy = async (req, res) => {
    const { type } = req.params;

    try {
        const policies = await policy.findOne({ type });
        if (policies) {
            return sendResponse(res, 200, "fetch Successfully", [], policies.content);
        }
        return sendResponse(res, 404, `${type} policy not found.`);

    } catch (error) {
        return sendResponse(res, 500, `Error fetching ${type} policy.`, error.message);
    }
};

const addPolicy = async (req, res) => {
    const { type } = req.params;
    const { content } = req.body;

    if (!content) {
        return sendResponse(res, 500, "Content is required")
    }

    try {
        let policies = await policy.findOne({ type });
        if (policies) {
            policies.content = content;
            policies.updatedAt = Date.now();
            await policies.save();
            return sendResponse(res, 200, `${type} policy updated successfully.`);
        } else {
            policies = new policy({ type, content });
            await policies.save();
            return sendResponse(res, 200, `${type} policy created successfully.`);
        }
    } catch (error) {
        return sendResponse(res, 500, `Error saving ${type} policy.`, error.message);

    }
};


module.exports = {
    getPolicy,
    addPolicy,
};

