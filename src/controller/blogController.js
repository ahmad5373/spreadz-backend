
const Blog = require('../models/blog');
const { sendResponse } = require('../utility/api');

const createBlogs = async (req, res) => {
    const { title, description, postType, imageUrl, postOwner } = req.body;

    try {
        await Blog.create({ title, description, postType, imageUrl, postOwner });
        return sendResponse(res, 201, "Blog Created Successfully!");
    } catch (error) {
        return sendResponse(res, 500, `Error creating Blog: ${error.message}`);
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        return sendResponse(res, 200, "All blogs fetched successfully", [], blogs);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching blogs: ${error.message}`);
    }
};

const getblogsWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const blogs = await Blog.findById(id)
        if (!blogs) {
            return sendResponse(res, 404, "blogs not found");
        }
        return sendResponse(res, 200, "blogs details fetched successfully", [], blogs);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching blogs: ${error.message}`);
    }
};

const editBlogs = async (req, res) => {
    const { id } = req.params;
    const { title, description, postType, imageUrl } = req.body;
    try {
        const updateBlogs = await Blog.findByIdAndUpdate(id, { title, description, postType, imageUrl }, { new: true, runValidators: true });
        if (!updateBlogs) {
            return sendResponse(res, 404, "blogs not found");
        }
        return sendResponse(res, 200, "blogs updated successfully", [], updateBlogs);
    } catch (error) {
        return sendResponse(res, 500, `Error updating blogs: ${error.message}`);
    }
};

const deleteBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        const blogs = await Blog.findById(id);
        if (!blogs) {
            return sendResponse(res, 404, "Faqs not found");
        }
        await Blog.deleteOne({ _id: id });
        return sendResponse(res, 200, "blogs deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting blogs: ${error.message}`);
    }
};

module.exports = {
    createBlogs,
    getAllBlogs,
    getblogsWithId,
    editBlogs,
    deleteBlogs,
};
