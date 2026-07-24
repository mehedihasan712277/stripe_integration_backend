"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../lib/prisma");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.cookies.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in. Please log in to access this resource");
        }
        const verifiedToken = jwt_1.jwtUtils.verifyToken(token, config_1.default.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { name, email, id, role, status } = verifiedToken.data;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                statusCode: http_status_1.default.FORBIDDEN,
                message: "Forbidden, you dont have to access to this resource",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
                // name,
                email,
                role,
                // if these fields are there, it needs log in again after updating name and id
            },
        });
        if (!user) {
            throw new Error("User not found. Please log in again");
        }
        if (user.status === "BLOCKED") {
            throw new Error("Your account has been blocked. Please contact support");
        }
        req.user = {
            id,
            name,
            email,
            role,
            userStatus: status,
        };
        next();
    });
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map