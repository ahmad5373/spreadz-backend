const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    postType: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    postOwner: {
        type: String,
        required: true,
    },
    shares: {
        type: Number,
    },
}, { timestamps: true });


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
