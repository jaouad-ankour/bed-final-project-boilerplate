// import { PrismaClient } from "@prisma/client";

// const createHost = async (
//   username,
//   password,
//   name,
//   email,
//   phoneNumber,
//   profilePicture,
//   aboutMe
// ) => {
//   const prisma = new PrismaClient();
//   const trimmedUserName = username.trim();
//   return prisma.host.create({
//     data: {
//       aboutMe,
//       email,
//       name,
//       phoneNumber,
//       profilePicture,
//       username: trimmedUserName,
//       password,
//     },
//   });
// };

// export default createHost;

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
  const prisma = new PrismaClient();
  if (!username || !password || !name || !email) {
    const error = new Error("Missing required fields");
    error.status = 400;
    throw error;
  }

  try {
    const trimmedUserName = username.trim();

    const newHost = await prisma.host.create({
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

    return newHost;
  } catch (error) {
    console.error("Error creating host:", error);
    const customError = new Error("Failed to create host");
    customError.status = 400;
    throw customError;
  } finally {
    await prisma.$disconnect();
  }
};

export default createHost;
