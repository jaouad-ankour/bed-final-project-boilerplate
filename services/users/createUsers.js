import { PrismaClient } from "@prisma/client";

const createUser = async (
  email,
  name,
  password,
  phoneNumber,
  pictureUrl,
  username
) => {
  const prisma = new PrismaClient();
  const trimmedUserName = username.trim();
  return prisma.user.create({
    data: {
      email,
      name,
      password,
      phoneNumber,
      pictureUrl,
      username: trimmedUserName,
    },
  });
};

export default createUser;
