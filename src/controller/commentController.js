 
const Comment = require('../models/comment');
const { sendResponse } = require('../utility/api');

const addComment = async (req, res) => {
    const { content, user_id, post_id} = req.body;
    try {
        await Comment.create({ content, user_id, post_id });
        return sendResponse(res, 201, "Comment Added Successfully!");
    } catch (error) {
        return sendResponse(res, 500, `Error Adding Comment: ${error.message}`);
    }
};

module.exports = {
    addComment,
};
