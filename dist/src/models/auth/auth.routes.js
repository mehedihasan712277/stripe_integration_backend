"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.authController.loginUser);
router.post("/refresh-token", auth_controller_1.authController.refreshToken);
router.post("/register", auth_controller_1.authController.registerUser);
router.get("/me", (0, auth_1.auth)(enums_1.Role.ADMIN, enums_1.Role.MODERATOR, enums_1.Role.ADMIN), auth_controller_1.authController.getMyProfile);
router.post("/logout", (0, auth_1.auth)(enums_1.Role.ADMIN, enums_1.Role.ADMIN, enums_1.Role.MODERATOR), auth_controller_1.authController.logoutUser);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map