import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    name: Joi.string().required(),
    message: Joi.string().required().min(10),  
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {listingId} = event.context.params;

    const {error} = schema.validate(body); 
    if(error) {
        throw createError({
            statusCode: 412,
            statusMessage: error.message,
        });
    }

    return prisma.message.create({
        data: {
            ...body,
            listingId: parseInt(listingId),
        }
    });
});