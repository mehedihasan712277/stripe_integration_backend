import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/enums";
import { TCreateOrderPayload } from "./order.interface";

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
            status: OrderStatus.UNPAID,
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

    return result;
};

// Called right after the Stripe session is created, so the webhook
// can later look the order up by session id if metadata is ever missing.
const attachStripeSessionId = async (
    orderId: string,
    stripeSessionId: string,
) => {
    return prisma.order.update({
        where: { id: orderId },
        data: { stripeSessionId },
    });
};

const updateOrderStatusById = async (orderId: string, status: OrderStatus) => {
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};

const updateOrderStatusBySessionId = async (
    stripeSessionId: string,
    status: OrderStatus,
) => {
    return prisma.order.update({
        where: { stripeSessionId },
        data: { status },
    });
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
    attachStripeSessionId,
    updateOrderStatusById,
    updateOrderStatusBySessionId,
    getOrdersFromDB,
};
