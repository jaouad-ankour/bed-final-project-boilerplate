// import { PrismaClient } from "@prisma/client";

// const createUser = async (
//   email,
//   name,
//   password,
//   phoneNumber,
//   pictureUrl,
//   username
// ) => {
//   const prisma = new PrismaClient();
//   const trimmedUserName = username.trim();
//   return prisma.user.create({
//     data: {
//       email,
//       name,
//       password,
//       phoneNumber,
//       pictureUrl,
//       username: trimmedUserName,
//     },
//   });
// };

// export default createUser;

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

  try {
    if (!email || !name || !password || !username) {
      const error = new Error("Missing required fields");
      error.status = 400;
      throw error;
    }

    const trimmedUserName = username.trim();

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        phoneNumber,
        pictureUrl,
        username: trimmedUserName,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    const customError = new Error("Failed to create user");
    customError.status = error.status || 400;
    throw customError;
  } finally {
    await prisma.$disconnect();
  }
};

export default createUser;
