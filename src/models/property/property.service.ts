import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { TCreateProperty, TUpdateProperty } from "./property.interface";

const craetePropertyIntoDb = async (
    payload: TCreateProperty,
    userId: string,
) => {
    // 1. Save the property in Postgres first, so we always have a record
    //    even if something goes wrong talking to Stripe.
    const property = await prisma.property.create({
        data: {
            name: payload.name,
            description: payload.description,
            rentPrice: payload.rentPrice,
            userId,
        },
    });
    // console.log("Property created in DB:", property);

    // 2. Create a Stripe product representing this property.
    const product = await stripe.products.create({
        name: property.name,
        description: property.description ?? undefined,
    });

    // console.log("Stripe product created:", product);
    // 3. Create a recurring monthly price for that product, based on rent.
    const price = await stripe.prices.create({
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
    const updatedProperty = await prisma.property.update({
        where: { id: property.id },
        data: {
            stripeProductId: product.id,
            stripePriceId: price.id,
        },
    });

    return updatedProperty;
};

const getAllPropertiesFromDb = async () => {
    return prisma.property.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });
};

const getPropertyByIdFromDb = async (id: string) => {
    return prisma.property.findUniqueOrThrow({
        where: { id },
        include: { user: true },
    });
};

const updatePropertyInDb = async (id: string, payload: TUpdateProperty) => {
    return prisma.property.update({
        where: { id },
        data: payload,
    });
};

const deletePropertyFromDb = async (id: string) => {
    return prisma.property.delete({
        where: { id },
    });
};

export const propertyService = {
    craetePropertyIntoDb,
    getAllPropertiesFromDb,
    getPropertyByIdFromDb,
    updatePropertyInDb,
    deletePropertyFromDb,
};
