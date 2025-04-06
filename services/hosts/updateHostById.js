import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const updatedHost = await prisma.host.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
  });

  if (!updatedHost || updatedHost.count === 0) {
    throw new NotFoundError("Host", id);
  }

  return {
    message: `Host with id ${id} was updated!`,
  };
};

export default updateHost;
