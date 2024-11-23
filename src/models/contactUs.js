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



const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
},
{ timestamps: true }
);

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;
