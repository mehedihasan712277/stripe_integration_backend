"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const payment_service_1 = require("./payment.service");
const createPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const result = await payment_service_1.paymentServices.handleCheckOut(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Checkout session created",
        data: result,
    });
});
exports.paymentController = {
    createPayment,
};
//# sourceMappingURL=payment.controller.js.map