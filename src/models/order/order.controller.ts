import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { orderServices } from "./order.service";

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
    getOrders,
};
