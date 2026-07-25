import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

router.post("/register", authController.registerUser);

router.get("/me", auth(Role.ADMIN, Role.USER), authController.getMyProfile);

router.post("/logout", auth(Role.ADMIN, Role.USER), authController.logoutUser);

export const authRoutes = router;
