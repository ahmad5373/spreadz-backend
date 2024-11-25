const Plan = require('../models/plans');

const seedPlans = async () => {
    const plans = [
        {
            title: 'Basic',
            description: "Ideal for individuals who need quick access to basic features.",
            monthlyPrice: 69.0,
            yearlyPrice: 690.0,
            features: [
                'Can be cancelled at any time on a monthly basis',
                '1 live action',
                'Live tracking',
                'Collect up to 5000 leads per year',
                '1 Link Google Business Account',
                'Telephone support',
                'With Spreadz branding',
                'Create teams to collaborate on designs',
            ],
            recommended: false,
        },
        {
            title: 'Pro',
            description: "Ideal for individuals who need quick access to basic features.",
            monthlyPrice: 99.0,
            yearlyPrice: 990.0,
            features: [
                'Can be cancelled at any time on a monthly basis',
                '+3 live promotions',
                '+3 live trackings',
                '+Collect up to 10,000 leads per year',
                '1 Link Google Business Account',
                'Video Upload Feature',
                'Telephone support + Video Call Support + Without Spreadz branding + Color Scheme Customization',
            ],
            recommended: true,
        },
        {
            title: 'Excellence',
            description: "Ideal for individuals who need quick access to basic features.",
            monthlyPrice: 169.0,
            yearlyPrice: 1690.0,
            features: [
                'Can be cancelled at any time on a monthly basis',
                '+10 live promotions',
                '+10 live trackings',
                '+Collect unlimited leads',
                '1 Link Google Business Account',
                'Video Upload Feature',
                'Telephone support + Video Call Support + Without Spreadz branding + Color Scheme Customization',
            ],
            recommended: false,
        },
    ];

    await Plan.insertMany(plans);
    console.log('Plans seeded successfully');
};

module.exports = seedPlans;