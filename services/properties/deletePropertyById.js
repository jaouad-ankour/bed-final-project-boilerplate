import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();

  const deletedProperty = await prisma.property.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedProperty || deletedProperty.count === 0) {
    throw new NotFoundError("Host", id);
  }

  return id;
};
export default deletePropertyById;
