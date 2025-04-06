import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  return prisma.host.findMany({
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
      pictureUrl: true,
      username: true,
    },
  });
};
export default getHosts;
