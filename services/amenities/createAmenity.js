import { PrismaClient } from "@prisma/client";

const createAmenity = async (id, name) => {
  const prisma = new PrismaClient();

  return prisma.amenity.create({
    data: {
      id,
      name,
    },
  });
};

export default createAmenity;
