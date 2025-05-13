// import { PrismaClient } from "@prisma/client";

// const getAmenities = async () => {
//   const prisma = new PrismaClient();

//   return prisma.amenity.findMany({
//     select: {
//       id: true,
//       name: true,
//       properties: true,
//     },
//   });
// };
// export default getAmenities;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // als je die hebt

const prisma = new PrismaClient(); // liefst extern gedeeld

const getAmenities = async () => {
  const amenities = await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      properties: true,
    },
  });

  if (!amenities || amenities.length === 0) {
    throw new NotFoundError("Amenities");
  }

  return amenities;
};

export default getAmenities;
