import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", id);
  }

  return host;
};

export default getHostById;
