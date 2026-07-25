"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const order_service_1 = require("./order.service");
const getOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await order_service_1.orderServices.getOrdersFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: result,
    });
});
exports.orderController = {
    getOrders,
};
//# sourceMappingURL=order.controller.js.map