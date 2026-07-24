import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { checkoutController } from "./checkout.controller";

const router = Router();

router.post("/", auth(Role.MODERATOR), checkoutController.createCheckout);

export const checkoutRoutes = router;
