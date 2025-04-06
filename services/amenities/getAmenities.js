import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new PrismaClient();

  return prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      properties: true,
    },
  });
};
export default getAmenities;
