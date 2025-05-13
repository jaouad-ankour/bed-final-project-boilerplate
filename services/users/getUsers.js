// import { PrismaClient } from "@prisma/client";

// const getUsers = async (username, email) => {
//   const prisma = new PrismaClient();

//   return prisma.user.findMany({
//     where: {
//       ...(username && {
//         username: {
//           contains: username,
//         },
//         ...(email && {
//           email: {
//             contains: email,
//           },
//         }),
//       }),
//     },
//     select: {
//       id: true,
//       username: true,
//       name: true,
//       email: true,
//       phoneNumber: true,
//       pictureUrl: true,
//     },
//   });
// };
// export default getUsers;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // als je die gebruikt

const prisma = new PrismaClient();

const getUsers = async (username, email) => {
  const users = await prisma.user.findMany({
    where: {
      ...(username && {
        username: {
          contains: username,
          mode: "insensitive",
        },
      }),
      ...(email && {
        email: {
          contains: email,
          mode: "insensitive",
        },
      }),
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });

  if (!users || users.length === 0) {
    throw new NotFoundError("Users", username || email || "all");
  }

  return users;
};

export default getUsers;
