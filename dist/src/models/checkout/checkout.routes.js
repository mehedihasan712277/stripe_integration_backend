"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const checkout_controller_1 = require("./checkout.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(enums_1.Role.MODERATOR), checkout_controller_1.checkoutController.createCheckout);
exports.checkoutRoutes = router;
//# sourceMappingURL=checkout.routes.js.map