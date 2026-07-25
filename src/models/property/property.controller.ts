import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertyService } from "./property.service";

const createProperty = catchAsync(async (req, res) => {
    const result = await propertyService.craetePropertyIntoDb(
        req.body,
        req.user!.id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property created successfully",
        data: result,
    });
});

const getAllProperties = catchAsync(async (req, res) => {
    const result = await propertyService.getAllPropertiesFromDb();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties fetched successfully",
        data: result,
    });
});

const getPropertyById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await propertyService.getPropertyByIdFromDb(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property fetched successfully",
        data: result,
    });
});

const updateProperty = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await propertyService.updatePropertyInDb(
        id as string,
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property updated successfully",
        data: result,
    });
});

const deleteProperty = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await propertyService.deletePropertyFromDb(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Property deleted successfully",
        data: result,
    });
});

export const propertyController = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
};
