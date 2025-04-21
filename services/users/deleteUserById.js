// import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../error/notFoundError.js"

// const deleteUser = async (id) => {
//   const prisma = new PrismaClient();

//   const deletedUser = await prisma.user.deleteMany({
//     where: {
//       id,
//     },
//   });

//   if (!deletedUser || deletedUser.count === 0) {
//     throw new NotFoundError("User", id);
//   }

//   return id;
// };
// export default deleteUser;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

// Best practice: Instantiate PrismaClient outside the function
// to avoid creating too many connections.
const prisma = new PrismaClient();

const deleteUser = async (id) => {
  try {
    // Use prisma.user.delete() for single record deletion by unique ID
    // This will correctly trigger the onDelete: Cascade behavior
    const deletedUser = await prisma.user.delete({
      where: {
        id, // 'id' is unique, so delete is appropriate
      },
    });

    // If delete is successful, it returns the deleted user object.
    // If the user doesn't exist, it throws a P2025 error (RecordNotFound).
    return deletedUser.id; // Or return the whole deletedUser object if needed
  } catch (error) {
    // Check if the error is Prisma's "Record to delete does not exist." error
    if (error.code === "P2025") {
      throw new NotFoundError("User", id);
    }
    // Re-throw other errors
    throw error;
  }
};

export default deleteUser;

// Remember to handle PrismaClient disconnection gracefully in your application lifecycle, e.g.:
// process.on('beforeExit', async () => {
//   await prisma.$disconnect();
// });
