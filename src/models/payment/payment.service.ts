import config from "../../config";
import { stripe } from "../../lib/stripe";

import { TCheckoutItem } from "./payment.interface";

const handleCheckOut = async (payload: TCheckoutItem[]) => {
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

    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items,

        success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${config.client_url}/cart`,
    });

    // return session; if I return session, I got a type error, It needs to study more
    return {
        id: session.id,
        url: session.url,
    };
};

export const paymentServices = {
    handleCheckOut,
};
