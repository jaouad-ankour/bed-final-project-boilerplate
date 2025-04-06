import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const updateUserById = async (
  id,
  email,
  name,
  password,
  phoneNumber,
  pictureUrl,
  username
) => {
  const prisma = new PrismaClient();
  const updatedUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      email,
      name,
      password,
      phoneNumber,
      pictureUrl,
      username,
    },
  });

  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError("User", id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
