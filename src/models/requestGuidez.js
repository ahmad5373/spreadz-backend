const mongoose = require('mongoose');

const RequestGuideSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    }
},
{ timestamps: true }
);

const RequestGuide = mongoose.model('RequestGuide', RequestGuideSchema);

module.exports = RequestGuide;
