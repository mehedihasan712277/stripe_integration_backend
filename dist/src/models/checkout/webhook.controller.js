"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookController = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe_1 = require("../../lib/stripe");
const order_service_1 = require("../order/order.service");
const enums_1 = require("../../../generated/prisma/enums");
const handleStripeWebhook = async (req, res) => {
    // console.log("Received Stripe webhook event:", req.body);
    // console.log("Stripe signature header:", req.headers["stripe-signature"]);
    // console.log(config.stripe_webhook_secret);
    const signature = req.headers["stripe-signature"];
    if (!signature) {
        return res
            .status(400)
            .send("Webhook Error: missing stripe-signature header");
    }
    let event;
    try {
        // req.body must be the raw, unparsed request body (Buffer) for
        // signature verification to work - see webhook.routes.ts.
        event = stripe_1.stripe.webhooks.constructEvent(req.body, signature, config_1.default.stripe_webhook_secret);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(400).send(`Webhook Error: ${message}`);
    }
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (orderId) {
                await order_service_1.orderServices.updateOrderStatusById(orderId, enums_1.OrderStatus.PAID);
            }
            else {
                await order_service_1.orderServices.updateOrderStatusBySessionId(session.id, enums_1.OrderStatus.PAID);
            }
            break;
        }
        case "checkout.session.expired": {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (orderId) {
                await order_service_1.orderServices.updateOrderStatusById(orderId, enums_1.OrderStatus.FAILED);
            }
            else {
                await order_service_1.orderServices.updateOrderStatusBySessionId(session.id, enums_1.OrderStatus.FAILED);
            }
            break;
        }
        default:
            // Unhandled event types are fine to ignore.
            break;
    }
    res.status(200).json({ received: true });
};
exports.webhookController = {
    handleStripeWebhook,
};
//# sourceMappingURL=webhook.controller.js.map