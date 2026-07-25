"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const checkout_service_1 = require("./checkout.service");
const createCheckout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("BODY:", req.body);
    const result = await checkout_service_1.checkoutServices.createCheckoutSession(req.body, req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Checkout session created successfully",
        data: result,
    });
});
exports.checkoutController = {
    createCheckout,
};
//# sourceMappingURL=checkout.controller.js.map