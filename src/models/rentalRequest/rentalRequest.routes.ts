import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rentalRequest.controller";

const router = Router();

// User applies to rent a property -> status starts as PENDING
router.post("/", auth(Role.USER), rentalRequestController.createRentalRequest);

// User views their own applications
router.get(
    "/my-requests",
    auth(Role.USER),
    rentalRequestController.getMyRentalRequests,
);

// Admin views every request
router.get("/", auth(Role.ADMIN), rentalRequestController.getAllRentalRequests);

// NOTE: this assumes auth() accepts multiple roles (auth(RoleA, RoleB)).
// If your auth.ts only accepts a single role, split this into two routes
// or add a check inside the service confirming req.user.id === request.userId
// for non-admins.
router.get(
    "/:id",
    auth(Role.ADMIN, Role.USER),
    rentalRequestController.getRentalRequestById,
);

// Admin decision on a pending request
router.patch(
    "/:id/approve",
    auth(Role.ADMIN),
    rentalRequestController.approveRentalRequest,
);
router.patch(
    "/:id/reject",
    auth(Role.ADMIN),
    rentalRequestController.rejectRentalRequest,
);

// User pays for an approved request -> creates the Stripe subscription checkout
router.post(
    "/:id/subscribe",
    auth(Role.USER),
    rentalRequestController.subscribeToRentalRequest,
);

export const rentalRequestRoutes = router;
