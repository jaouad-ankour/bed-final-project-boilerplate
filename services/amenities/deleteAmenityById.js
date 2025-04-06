import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();

  const deletedAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedAmenity || deletedAmenity.count === 0) {
    throw new NotFoundError("Amenity", id);
  }

  return id;
};
export default deleteAmenityById;
