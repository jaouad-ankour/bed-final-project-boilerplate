// import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../error/notFoundError.js";

// const deleteHostById = async (id) => {
//   const prisma = new PrismaClient();
//   console.log("id", id);
//   const deletedHost = await prisma.host.deleteMany({
//     where: {
//       id,
//     },
//   });

//   if (!deletedHost || deletedHost.count === 0) {
//     throw new NotFoundError("Host", id);
//   }

//   return id;
// };
// export default deleteHostById;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  console.log("Attempting to delete host with id:", id);

  try {
    await prisma.$transaction(async (tx) => {
      const deletedProperties = await tx.property.deleteMany({
        where: {
          hostId: id,
        },
      });
      console.log(
        `Deleted ${deletedProperties.count} properties associated with host ${id}`
      );

      const deletedHost = await tx.host.delete({
        where: {
          id: id,
        },
      });
      console.log(`Successfully deleted host ${id}`);

      if (!deletedHost) {
        throw new NotFoundError("Host", id);
      }

      return deletedHost;
    });

    return id;
  } catch (error) {
    if (error.code === "P2025") {
      console.error(`Host with ID ${id} not found for deletion.`);
      throw new NotFoundError("Host", id);
    }
    console.error(`Error deleting host ${id}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteHostById;
