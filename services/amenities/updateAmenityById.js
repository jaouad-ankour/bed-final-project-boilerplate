import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const updateAmenity = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!updatedAmenity || updatedAmenity.count === 0) {
    throw new NotFoundError("Amenity", id);
  }

  return {
    message: `Amenity with id ${id} was updated!`,
  };
};

export default updateAmenity;
