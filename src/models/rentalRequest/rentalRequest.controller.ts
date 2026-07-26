import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalRequestServices } from "./rentalRequest.service";

const createRentalRequest = catchAsync(async (req, res) => {
    const result = await rentalRequestServices.createRentalRequestIntoDb(
        req.body,
        req.user!.id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Rental request submitted successfully",
        data: result,
    });
});

const getAllRentalRequests = catchAsync(async (req, res) => {
    const result = await rentalRequestServices.getAllRentalRequestsFromDb();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental requests fetched successfully",
        data: result,
    });
});

const getMyRentalRequests = catchAsync(async (req, res) => {
    const result = await rentalRequestServices.getMyRentalRequestsFromDb(
        req.user!.id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Your rental requests fetched successfully",
        data: result,
    });
});

const getRentalRequestById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await rentalRequestServices.getRentalRequestByIdFromDb(
        id as string,
        req.user!.id,
        req.user!.role,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental request fetched successfully",
        data: result,
    });
});

const approveRentalRequest = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await rentalRequestServices.approveRentalRequestInDb(
        id as string,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental request approved successfully",
        data: result,
    });
});

const rejectRentalRequest = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await rentalRequestServices.rejectRentalRequestInDb(
        id as string,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental request rejected successfully",
        data: result,
    });
});

const subscribeToRentalRequest = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result =
        await rentalRequestServices.createSubscriptionCheckoutSession(
            id as string,
            req.user!.id,
        );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Subscription checkout session created",
        data: result,
    });
});

export const rentalRequestController = {
    createRentalRequest,
    getAllRentalRequests,
    getMyRentalRequests,
    getRentalRequestById,
    approveRentalRequest,
    rejectRentalRequest,
    subscribeToRentalRequest,
};
