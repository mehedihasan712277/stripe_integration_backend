import { prisma } from "../../lib/prisma";
import { TCreateOrderPayload } from "./order.interface";
import config from "../../config";
import { stripe } from "../../lib/stripe";

const createOrderIntoDB = async (
    payload: TCreateOrderPayload,
    userId: string,
) => {
    const totalAmount = payload.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const result = await prisma.order.create({
        data: {
            userId,
            totalAmount,
            items: {
                create: payload.items.map((item) => ({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    images: item.images,
                    quantity: item.quantity,
                })),
            },
        },
        include: {
            items: true,
            user: true,
        },
    });

    // return result;
    // stripe-----------------------------------------
    const line_items = payload.items.map((item) => ({
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

    return {
        result,
        id: session.id,
        url: session.url,
    };
};

const getOrdersFromDB = async () => {
    return prisma.order.findMany({
        include: {
            user: true,
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const orderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
