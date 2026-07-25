import { Router } from "express";
import { propertyController } from "./property.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN), propertyController.createProperty);
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", auth(Role.ADMIN), propertyController.updateProperty);
router.delete("/:id", auth(Role.ADMIN), propertyController.deleteProperty);

export const propertyRoutes = router;
