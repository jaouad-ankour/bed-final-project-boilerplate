import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  const deletedUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedUser || deletedUser.count === 0) {
    throw new NotFoundError("User", id);
  }

  return id;
};
export default deleteUser;