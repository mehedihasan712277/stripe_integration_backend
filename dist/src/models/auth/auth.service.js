"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../lib/prisma");
const config_1 = __importDefault(require("../../config"));
const jwt_1 = require("../../utils/jwt");
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    if (user.status === "BLOCKED") {
        throw new Error("Your account has been blocked. Please contact support");
    }
    const isPasswordMatched = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
    const accessToken = jwt_1.jwtUtils.createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = jwt_1.jwtUtils.createToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
};
const refreshToken = async (refreshToken) => {
    const verifiedRefreshToken = jwt_1.jwtUtils.verifyToken(refreshToken, config_1.default.jwt_refresh_secret);
    if (!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error);
    }
    const { id } = verifiedRefreshToken.data;
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    if (user.status === "BLOCKED") {
        throw new Error("User is blocked");
    }
    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwt_1.jwtUtils.createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { accessToken };
};
const register = async (payload) => {
    const { name, email, password, profilePhoto, role } = payload;
    if (role === "ADMIN" && payload.key !== config_1.default.admin_registration_key) {
        throw new Error("provide correct key to register as admin");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const createdUser = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            profile: {
                create: {
                    profilePhoto,
                },
            },
        },
    });
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email,
        },
        omit: {
            password: true,
        },
        include: {
            profile: true,
        },
    });
    return user;
};
const getMyProfileFromDB = async (userId) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: { password: true },
        include: {
            profile: true,
        },
    });
    return user;
};
exports.authService = {
    loginUser,
    refreshToken,
    register,
    getMyProfileFromDB,
};
//# sourceMappingURL=auth.service.js.map