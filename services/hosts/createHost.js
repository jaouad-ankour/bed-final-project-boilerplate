import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  console.log(
    "ALLE INPUTS",
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
  );
  const prisma = new PrismaClient();
  const trimmedUserName = username.trim();
  return prisma.host.create({
    data: {
      aboutMe,
      email,
      name,
      phoneNumber,
      profilePicture,
      username: trimmedUserName,
      password,
    },
  });
};

export default createHost;
