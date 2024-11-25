const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    monthlyPrice: {
        type: Number,
        required: true,
    },
    yearlyPrice: {
        type: Number, 
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    recommended: {
        type: Boolean,
        default: false,
    },
});


const SubscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model
            required: true,
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan',
            required: true,
        },
        billingCycle: {
            type: String,
            enum: ['monthly', 'yearly'],
            required: true,
        },
        stripeSubscriptionId: {
            type: String, // To store the Stripe subscription ID
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date, // Optional, can calculate based on the billing cycle
        },
    },
    { timestamps: true }
);

const Plan = mongoose.model('Plan', PlanSchema);
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = {
    Plan,
    Subscription,
};
