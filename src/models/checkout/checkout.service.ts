import config from "../../config";
import { stripe } from "../../lib/stripe";
import { orderServices } from "../order/order.service";
import { TCreateCheckoutPayload } from "./checkout.interface";

const createCheckoutSession = async (
    payload: TCreateCheckoutPayload,
    userId: string,
) => {
    // 1. Create the order first. It's created with status UNPAID (the
    //    Prisma default) so we always have a record even if the user
    //    abandons the Stripe checkout page.
    const order = await orderServices.createOrderIntoDB(payload, userId);

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
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        metadata: {
            orderId: order.id,
        },
        success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.client_url}/cart`,
    });

    // 4. Persist the session id on the order as a fallback lookup path.
    await orderServices.attachStripeSessionId(order.id, session.id);

    return {
        orderId: order.id,
        url: session.url,
    };
};

export const checkoutServices = {
    createCheckoutSession,
};
