"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutServices = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe_1 = require("../../lib/stripe");
const order_service_1 = require("../order/order.service");
const createCheckoutSession = async (payload, userId) => {
    // 1. Create the order first. It's created with status UNPAID (the
    //    Prisma default) so we always have a record even if the user
    //    abandons the Stripe checkout page.
    const order = await order_service_1.orderServices.createOrderIntoDB(payload, userId);
    // 2. Build Stripe line items from the order items we just persisted,
    //    so the amounts charged always match what's stored in the DB.
    const line_items = order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: Math.round(item.price * 100),
            product_data: {
                name: item.name,
                images: item.images,
                description: item.description ?? undefined,
            },
        },
    }));
    // 3. Create the Stripe Checkout Session, tagging it with our orderId
    //    so the webhook can reliably find the order later.
    const session = await stripe_1.stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        metadata: {
            orderId: order.id,
        },
        success_url: `${config_1.default.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config_1.default.client_url}/cart`,
    });
    // 4. Persist the session id on the order as a fallback lookup path.
    await order_service_1.orderServices.attachStripeSessionId(order.id, session.id);
    return {
        orderId: order.id,
        url: session.url,
    };
};
exports.checkoutServices = {
    createCheckoutSession,
};
//# sourceMappingURL=checkout.service.js.map