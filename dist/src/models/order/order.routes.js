"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.auth)(enums_1.Role.ADMIN), order_controller_1.orderController.getOrders);
exports.orderRoutes = router;
//# sourceMappingURL=order.routes.js.map