import Joi from "joi";
import { PrismaClient } from "@prisma/client";
//import cars from "@/data/cars.json";

const prisma = new PrismaClient();

const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().min(1886).max(new Date().getFullYear() + 1),
    price: Joi.number().required().min(0),
    mileage: Joi.number().required().min(0),
    city: Joi.string().required().min(2),
    numberOfSeats: Joi.number().required().min(1),
    features: Joi.array().items(Joi.string()),
    image: Joi.string().required(),
    listerId: Joi.string().required(),
    description: Joi.string().required().min(0),
    name: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {error, value} = schema.validate(body);
    if(error) {
        throw createError({
            statusCode: 412,
            statusMessage: `index.post.js ${error.message}`,
        });
    }

    const {
        make,
        model,
        year,
        price,
        mileage,
        city,
        numberOfSeats,
        features,
        image,
        listerId,
        description,
        name,
    } = body;
    
   
    const car = await prisma.car.create ({
        data:{
            make,
            model,
            year,
            price,
            mileage,
            city: city.toLowerCase(),
            numberOfSeats,
            features,
            image,
            listerId,
            description,
            name,
        }
    })

     return car;
})