import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const createOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderServices.createOrderIntoDB();
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "order craeted",
            data: {},
        });
    },
);

const getOrders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderServices.getOrdersFromDB;
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "order retrived",
            data: {},
        });
    },
);

export const orderController = {
    createOrder,
    getOrders,
};
