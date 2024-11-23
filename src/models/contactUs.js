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

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
},
{ timestamps: true }
);

const ContactUs = mongoose.model('ContactUs', ContactUsSchema);
const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = {
    ContactUs,
    Newsletter,
};