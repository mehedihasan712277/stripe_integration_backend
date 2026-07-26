import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../lib/stripe";
import { orderServices } from "../order/order.service";
import { rentalRequestServices } from "../rentalRequest/rentalRequest.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const handleStripeWebhook = async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
        return res
            .status(400)
            .send("Webhook Error: missing stripe-signature header");
    }

    let event: Stripe.Event;

    try {
        // req.body must be the raw, unparsed request body (Buffer) for
        // signature verification to work - see webhook.routes.ts.
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            config.stripe_webhook_secret as string,
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(400).send(`Webhook Error: ${message}`);
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;
            const rentalRequestId = session.metadata?.rentalRequestId;

            if (rentalRequestId) {
                // Subscription checkout created by the rental flow.
                const subscriptionId =
                    typeof session.subscription === "string"
                        ? session.subscription
                        : session.subscription?.id;

                await rentalRequestServices.completeRentalRequestById(
                    rentalRequestId,
                    subscriptionId as string,
                );
            } else if (orderId) {
                // One-time payment created by the order/checkout flow.
                await orderServices.updateOrderStatusById(
                    orderId,
                    OrderStatus.PAID,
                );
            } else {
                // Fallback for sessions created before metadata existed.
                await orderServices.updateOrderStatusBySessionId(
                    session.id,
                    OrderStatus.PAID,
                );
            }
            break;
        }

        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;
            const rentalRequestId = session.metadata?.rentalRequestId;

            if (rentalRequestId) {
                // Nothing to do - the rental request just stays APPROVED,
                // so the user can hit /subscribe again to retry payment.
                break;
            }

            if (orderId) {
                await orderServices.updateOrderStatusById(
                    orderId,
                    OrderStatus.FAILED,
                );
            } else {
                await orderServices.updateOrderStatusBySessionId(
                    session.id,
                    OrderStatus.FAILED,
                );
            }
            break;
        }

        default:
            // Unhandled event types are fine to ignore.
            break;
    }

    res.status(200).json({ received: true });
};

export const webhookController = {
    handleStripeWebhook,
};
