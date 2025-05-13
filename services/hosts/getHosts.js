import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // als je die gebruikt

const prisma = new PrismaClient();

const getHosts = async (name) => {
  const hosts = await prisma.host.findMany({
    where: {
      ...(name && {
        name: {
          contains: name,
        },
      }),
    },
    select: {
      id: true,
      aboutMe: true,
      email: true,
      listings: true,
      name: true,
      phoneNumber: true,
      profilePicture: true,
      username: true,
    },
  });

  if (!hosts || hosts.length === 0) {
    throw new NotFoundError("Host(s)", name || "all");
  }

  return hosts;
};

export default getHosts;
