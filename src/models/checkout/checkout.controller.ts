import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { checkoutServices } from "./checkout.service";

const createCheckout = catchAsync(async (req, res) => {
    console.log("BODY:", req.body);

    const result = await checkoutServices.createCheckoutSession(
        req.body,
        req.user!.id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Checkout session created successfully",
        data: result,
    });
});

export const checkoutController = {
    createCheckout,
};
