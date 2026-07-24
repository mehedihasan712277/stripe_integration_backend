import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentServices } from "./payment.service";

const createPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        const result = await paymentServices.handleCheckOut(payload);

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Checkout session created",
            data: result,
        });
    },
);

export const paymentController: {
    createPayment: typeof createPayment;
} = {
    createPayment,
};
