"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const prisma_1 = require("../../lib/prisma");
const enums_1 = require("../../../generated/prisma/enums");
const createOrderIntoDB = async (payload, userId) => {
    const totalAmount = payload.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    const result = await prisma_1.prisma.order.create({
        data: {
            userId,
            totalAmount,
            status: enums_1.OrderStatus.UNPAID,
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
const attachStripeSessionId = async (orderId, stripeSessionId) => {
    return prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { stripeSessionId },
    });
};
const updateOrderStatusById = async (orderId, status) => {
    return prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
const updateOrderStatusBySessionId = async (stripeSessionId, status) => {
    return prisma_1.prisma.order.update({
        where: { stripeSessionId },
        data: { status },
    });
};
const getOrdersFromDB = async () => {
    return prisma_1.prisma.order.findMany({
        include: {
            user: true,
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.orderServices = {
    createOrderIntoDB,
    attachStripeSessionId,
    updateOrderStatusById,
    updateOrderStatusBySessionId,
    getOrdersFromDB,
};
//# sourceMappingURL=order.service.js.map