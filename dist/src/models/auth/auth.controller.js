"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await auth_service_1.authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        // maxAge: 1000 * 10,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "user logged in successfully",
        data: { accessToken, refreshToken },
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await auth_service_1.authService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        // maxAge: 1000 * 10,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Token refreshed successfully",
        data: { accessToken },
    });
});
const registerUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const user = await auth_service_1.authService.register(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User registered successfully",
        data: { user },
    });
});
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const profile = await auth_service_1.authService.getMyProfileFromDB(req.user?.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User profile fetched successfully",
        data: { profile },
    });
});
const logoutUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged out successfully",
        data: null,
    });
});
exports.authController = {
    loginUser,
    refreshToken,
    registerUser,
    getMyProfile,
    logoutUser, // add this
};
//# sourceMappingURL=auth.controller.js.map