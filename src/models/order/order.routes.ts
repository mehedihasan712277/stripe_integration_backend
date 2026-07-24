import { Router } from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.MODERATOR), orderController.createOrder);

router.get("/", auth(Role.ADMIN), orderController.getOrders);

export const orderRoutes = router;
