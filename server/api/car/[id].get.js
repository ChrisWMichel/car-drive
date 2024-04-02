//import cars from "@/data/cars.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {id, listerId} = event.context.params;

  const car = await prisma.car.findUnique({
    where: {
      id: parseInt(id),
      //listerId: id
    },
  });

  if(!car) {
    throw createError({
        statusCode: 404,
        statusMessage: `Car with ID ${id} not found.`,
    })
  } 

  return car;
})

