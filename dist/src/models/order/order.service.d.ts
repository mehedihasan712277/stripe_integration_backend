import { OrderStatus } from "../../../generated/prisma/enums";
import { TCreateOrderPayload } from "./order.interface";
declare const createOrderIntoDB: (payload: TCreateOrderPayload, userId: string) => Promise<{
    items: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        images: string[];
        quantity: number;
        orderId: string;
    }[];
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    status: OrderStatus;
    totalAmount: number;
    stripeSessionId: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const attachStripeSessionId: (orderId: string, stripeSessionId: string) => Promise<{
    id: string;
    status: OrderStatus;
    totalAmount: number;
    stripeSessionId: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateOrderStatusById: (orderId: string, status: OrderStatus) => Promise<{
    id: string;
    status: OrderStatus;
    totalAmount: number;
    stripeSessionId: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateOrderStatusBySessionId: (stripeSessionId: string, status: OrderStatus) => Promise<{
    id: string;
    status: OrderStatus;
    totalAmount: number;
    stripeSessionId: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getOrdersFromDB: () => Promise<({
    items: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        images: string[];
        quantity: number;
        orderId: string;
    }[];
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    status: OrderStatus;
    totalAmount: number;
    stripeSessionId: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const orderServices: {
    createOrderIntoDB: typeof createOrderIntoDB;
    attachStripeSessionId: typeof attachStripeSessionId;
    updateOrderStatusById: typeof updateOrderStatusById;
    updateOrderStatusBySessionId: typeof updateOrderStatusBySessionId;
    getOrdersFromDB: typeof getOrdersFromDB;
};
export {};
//# sourceMappingURL=order.service.d.ts.map