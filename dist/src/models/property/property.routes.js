"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRoutes = void 0;
const express_1 = require("express");
const property_controller_1 = require("./property.controller");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(enums_1.Role.ADMIN), property_controller_1.propertyController.createProperty);
router.get("/", property_controller_1.propertyController.getAllProperties);
router.get("/:id", property_controller_1.propertyController.getPropertyById);
router.put("/:id", (0, auth_1.auth)(enums_1.Role.ADMIN), property_controller_1.propertyController.updateProperty);
router.delete("/:id", (0, auth_1.auth)(enums_1.Role.ADMIN), property_controller_1.propertyController.deleteProperty);
exports.propertyRoutes = router;
//# sourceMappingURL=property.routes.js.map