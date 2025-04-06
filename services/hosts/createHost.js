import { PrismaClient } from "@prisma/client";

const createHost = async (
  id,
  aboutMe,
  email,
  name,
  phoneNumber,
  pictureUrl,
  username,
  password
) => {
  const prisma = new PrismaClient();

  return prisma.host.create({
    data: {
      id,
      aboutMe,
      email,
      name,
      phoneNumber,
      pictureUrl,
      username,
      password,
    },
  });
};

export default createHost;
