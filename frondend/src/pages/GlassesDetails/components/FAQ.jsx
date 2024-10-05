import React from "react";

const FAQ = () => {
    const faqs = [
        { q: "How do I know if these glasses will fit me?", a: "We provide detailed measurements in our size guide. You can also use our virtual try-on feature to see how they look on you." },
        { q: "What's your return policy?", a: "We offer a 30-day return policy for all our products. If you're not satisfied, you can return the item for a full refund or exchange." },
        { q: "Do you offer prescription lenses?", a: "Yes, we can fit prescription lenses to this frame. You can select this option during checkout." }
    ];

    return (
        <div className="flex flex-col mt-20">
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold mb-2">{faq.q}</h4>
                        <p className="text-gray-600">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;