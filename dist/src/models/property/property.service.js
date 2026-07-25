"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyService = void 0;
const prisma_1 = require("../../lib/prisma");
const stripe_1 = require("../../lib/stripe");
const craetePropertyIntoDb = async (payload, userId) => {
    // 1. Save the property in Postgres first, so we always have a record
    //    even if something goes wrong talking to Stripe.
    const property = await prisma_1.prisma.property.create({
        data: {
            name: payload.name,
            description: payload.description,
            rentPrice: payload.rentPrice,
            userId,
        },
    });
    // console.log("Property created in DB:", property);
    // 2. Create a Stripe product representing this property.
    const product = await stripe_1.stripe.products.create({
        name: property.name,
        description: property.description ?? undefined,
    });
    // console.log("Stripe product created:", product);
    // 3. Create a recurring monthly price for that product, based on rent.
    const price = await stripe_1.stripe.prices.create({
        unit_amount: Math.round(property.rentPrice * 100),
        currency: "usd",
        recurring: {
            interval: "month",
        },
        product: product.id,
    });
    // console.log("Stripe price created:", price);
    // 4. Persist the Stripe ids back onto the property so a later
    //    subscription checkout can reference property.stripePriceId.
    const updatedProperty = await prisma_1.prisma.property.update({
        where: { id: property.id },
        data: {
            stripeProductId: product.id,
            stripePriceId: price.id,
        },
    });
    return updatedProperty;
};
const getAllPropertiesFromDb = async () => {
    return prisma_1.prisma.property.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });
};
const getPropertyByIdFromDb = async (id) => {
    return prisma_1.prisma.property.findUniqueOrThrow({
        where: { id },
        include: { user: true },
    });
};
const updatePropertyInDb = async (id, payload) => {
    return prisma_1.prisma.property.update({
        where: { id },
        data: payload,
    });
};
const deletePropertyFromDb = async (id) => {
    return prisma_1.prisma.property.delete({
        where: { id },
    });
};
exports.propertyService = {
    craetePropertyIntoDb,
    getAllPropertiesFromDb,
    getPropertyByIdFromDb,
    updatePropertyInDb,
    deletePropertyFromDb,
};
//# sourceMappingURL=property.service.js.map