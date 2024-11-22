const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
},
{ timestamps: true }
);

const ContactUs = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUs;
