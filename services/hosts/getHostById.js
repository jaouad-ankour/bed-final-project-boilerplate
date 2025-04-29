import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      name: true,
      aboutMe: true,
      phoneNumber: true,
      profilePicture: true,
      id: true,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", id);
  }

  return host;
};

export default getHostById;
