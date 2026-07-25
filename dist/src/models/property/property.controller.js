"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const property_service_1 = require("./property.service");
const createProperty = () => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await property_service_1.propertyService.craetePropertyIntoDb(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Property created successfully",
        data: result,
    });
});
const getAllProperties = () => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await property_service_1.propertyService.getAllPropertiesFromDb();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Properties fetched successfully",
        data: result,
    });
});
const getPropertyById = () => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const result = await property_service_1.propertyService.getPropertyByIdFromDb(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Property fetched successfully",
        data: result,
    });
});
const updateProperty = () => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const result = await property_service_1.propertyService.updatePropertyInDb(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Property updated successfully",
        data: result,
    });
});
const deleteProperty = () => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const result = await property_service_1.propertyService.deletePropertyFromDb(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Property deleted successfully",
        data: result,
    });
});
exports.propertyController = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
};
//# sourceMappingURL=property.controller.js.map