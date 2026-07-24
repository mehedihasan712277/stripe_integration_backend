import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
    const result = await orderServices.createOrderIntoDB(
        req.body,
        req.user!.id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Order created successfully",
        data: result,
    });
});

const getOrders = catchAsync(async (req, res) => {
    const result = await orderServices.getOrdersFromDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: result,
    });
});

export const orderController = {
    createOrder,
    getOrders,
};
