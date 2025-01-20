const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
}, { timestamps: true });


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
