import { Router } from "express";
import { propertyController } from "./property.controller";

const router = Router();

router.post("/", propertyController.createProperty());
router.get("/", propertyController.getAllProperties());
router.get("/:id", propertyController.getPropertyById());
router.put("/:id", propertyController.updateProperty());
router.delete("/:id", propertyController.deleteProperty());

export const propertyRoutes = router;
