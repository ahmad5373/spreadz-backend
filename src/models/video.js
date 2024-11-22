const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    }
},
{ timestamps: true }
);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
