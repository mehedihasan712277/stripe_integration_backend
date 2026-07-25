"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe_1 = require("../../lib/stripe");
const handleCheckOut = async (payload) => {
    const line_items = payload.map((item) => ({
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.name,
                images: item.images,
                description: item.description,
            },
        },
    }));
    const session = await stripe_1.stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        success_url: `${config_1.default.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config_1.default.client_url}/cart`,
    });
    // return session; if I return session, I got a type error, It needs to study more
    return {
        id: session.id,
        url: session.url,
    };
};
exports.paymentServices = {
    handleCheckOut,
};
//# sourceMappingURL=payment.service.js.map