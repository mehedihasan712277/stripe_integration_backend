import { prisma } from "../../lib/prisma";
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
