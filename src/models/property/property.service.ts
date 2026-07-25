import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { TCreateProperty, TUpdateProperty } from "./property.interface";

const craetePropertyIntoDb = async (
    payload: TCreateProperty,
    userId: string,
) => {
    // 1. Save the property in Postgres first.
    const property = await prisma.property.create({
        data: {
            name: payload.name,
            description: payload.description,
            rentPrice: payload.rentPrice,
            userId,
        },
    });

    let product: Stripe.Product | null = null;

    try {
        // 2. Create a Stripe Product.
        product = await stripe.products.create({
            name: property.name,
            description: property.description ?? undefined,
        });

        // 3. Create a recurring monthly Stripe Price.
        const price = await stripe.prices.create({
            unit_amount: Math.round(property.rentPrice * 100),
            currency: "usd",
            recurring: {
                interval: "month",
            },
            product: product.id,
        });

        // 4. Save Stripe IDs in the database.
        const updatedProperty = await prisma.property.update({
            where: { id: property.id },
            data: {
                stripeProductId: product.id,
                stripePriceId: price.id,
            },
        });

        return updatedProperty;
    } catch (error) {
        // If a Stripe Product was created, archive it.
        if (product) {
            await stripe.products.update(product.id, {
                active: false,
            });
        }

        // Remove the partially created property from the database.
        await prisma.property.delete({
            where: { id: property.id },
        });

        throw error;
    }
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
