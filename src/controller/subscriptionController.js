const dotenv = require("dotenv");
dotenv.config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Plan, Subscription } = require("../models/plans");
const { sendResponse } = require("../utility/api");

const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        return sendResponse(res, 200, "Plans fetched successfully", [], plans);
    } catch (error) {
        return sendResponse(res, 500, "Failed to fetch plans", error.message);
    }
};

const prices = {
    Basic: {
        monthly: "price_1QP5sDAMrpg8m0TRpJmq5VXw",
        yearly: "price_1QP6SBAMrpg8m0TRyVKCd5TD",
    },
    Pro: {
        monthly: "price_1QP5rMAMrpg8m0TR0E4RJm1A",
        yearly: "price_1QP6TTAMrpg8m0TRgSs2XYhT",
    },
    Excellence: {
        monthly: "price_1QP5qaAMrpg8m0TRRG5mOovm",
        yearly: "price_1QP6TwAMrpg8m0TRzzxtYB4c",
    },
};

const checkOutSession = async (req, res) => {
    const { planTitle, billingCycle } = req.body;
    try {
        const plan = await Plan.findOne({ title: planTitle });
        const priceId = prices[planTitle][billingCycle];
        if (!priceId) {
            return res.status(400).json({ error: "Invalid plan or billing cycle" });
        }
        console.log("stripe =>", stripe);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: "https://spreadz.vercel.app/success",
            cancel_url: "https://spreadz.vercel.app/cancel",
        });
        res.json({ url: session.url });
        await saveSubscription('67401ae377702d372eec3394', plan._id, billingCycle, session.id);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return sendResponse(res, 500, "Failed to fetch plans", error.message);

    }
};

const saveSubscription = async (userId, planId, billingCycle, stripeSubscriptionId) => {
    try {
        const subscription = new Subscription({
            userId,
            planId,
            billingCycle,
            stripeSubscriptionId,
        });

        await subscription.save();
        console.log("Subscription saved successfully");
    } catch (error) {
        console.error("Error saving subscription:", error);
    }
};


module.exports = {
    getAllPlans,
    checkOutSession,
};
