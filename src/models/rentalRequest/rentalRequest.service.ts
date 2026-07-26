import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { RentalRequestStatus, Role } from "../../../generated/prisma/enums";
import { TCreateRentalRequest } from "./rentalRequest.interface";

// 1. User applies to rent a property.
const createRentalRequestIntoDb = async (
    payload: TCreateRentalRequest,
    userId: string,
) => {
    // Confirms the property exists (throws a Prisma not-found error otherwise).
    const property = await prisma.property.findUniqueOrThrow({
        where: { id: payload.propertyId },
    });

    return prisma.rentalRequest.create({
        data: {
            userId,
            propertyId: property.id,
        },
    });
};

const getAllRentalRequestsFromDb = async () => {
    return prisma.rentalRequest.findMany({
        include: { user: true, property: true },
        orderBy: { createdAt: "desc" },
    });
};

const getMyRentalRequestsFromDb = async (userId: string) => {
    return prisma.rentalRequest.findMany({
        where: { userId },
        include: { property: true },
        orderBy: { createdAt: "desc" },
    });
};

const getRentalRequestByIdFromDb = async (
    id: string,
    requesterId: string,
    requesterRole: Role,
) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id },
        include: { user: true, property: true },
    });

    // Admins can view any request; regular users can only view their own.
    if (requesterRole !== Role.ADMIN && rentalRequest.userId !== requesterId) {
        throw new Error("You are not allowed to view this rental request");
    }

    return rentalRequest;
};

// 2. Admin approves or rejects a pending request.
const approveRentalRequestInDb = async (id: string) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id },
    });

    if (rentalRequest.status !== RentalRequestStatus.PENDING) {
        throw new Error("Only pending rental requests can be approved");
    }

    return prisma.rentalRequest.update({
        where: { id },
        data: { status: RentalRequestStatus.APPROVED },
    });
};

const rejectRentalRequestInDb = async (id: string) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id },
    });

    if (rentalRequest.status !== RentalRequestStatus.PENDING) {
        throw new Error("Only pending rental requests can be rejected");
    }

    return prisma.rentalRequest.update({
        where: { id },
        data: { status: RentalRequestStatus.REJECTED },
    });
};

// 3. User pays for an approved request - creates a subscription checkout
//    session against the property's Stripe price.
const createSubscriptionCheckoutSession = async (
    id: string,
    userId: string,
) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: { id },
        include: { property: true },
    });

    if (rentalRequest.userId !== userId) {
        throw new Error(
            "You are not allowed to subscribe to this rental request",
        );
    }

    if (rentalRequest.status !== RentalRequestStatus.APPROVED) {
        throw new Error("This rental request has not been approved yet");
    }

    if (!rentalRequest.property.stripePriceId) {
        throw new Error(
            "This property does not have a Stripe price configured",
        );
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: rentalRequest.property.stripePriceId,
                quantity: 1,
            },
        ],
        metadata: {
            rentalRequestId: rentalRequest.id,
        },
        success_url: `${config.client_url}/rentals/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.client_url}/rentals/${rentalRequest.id}`,
    });

    await prisma.rentalRequest.update({
        where: { id: rentalRequest.id },
        data: { stripeSessionId: session.id },
    });

    return { url: session.url };
};

// 4. Called from the webhook once Stripe confirms the subscription payment.
const completeRentalRequestById = async (
    id: string,
    stripeSubscriptionId: string,
) => {
    return prisma.rentalRequest.update({
        where: { id },
        data: {
            status: RentalRequestStatus.COMPLETED,
            stripeSubscriptionId,
        },
    });
};

export const rentalRequestServices = {
    createRentalRequestIntoDb,
    getAllRentalRequestsFromDb,
    getMyRentalRequestsFromDb,
    getRentalRequestByIdFromDb,
    approveRentalRequestInDb,
    rejectRentalRequestInDb,
    createSubscriptionCheckoutSession,
    completeRentalRequestById,
};
