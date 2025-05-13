// import { PrismaClient } from "@prisma/client";

// const getReviews = async () => {
//   const prisma = new PrismaClient();

//   return prisma.review.findMany({
//     select: {
//       comment: true,
//       id: true,
//       property: true,
//       propertyId: true,
//       rating: true,
//       user: true,
//       userId: true,
//     },
//   });
// };
// export default getReviews;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // als je deze gebruikt

const prisma = new PrismaClient();

const getReviews = async () => {
  const reviews = await prisma.review.findMany({
    select: {
      comment: true,
      id: true,
      property: true,
      propertyId: true,
      rating: true,
      user: true,
      userId: true,
    },
  });

  if (!reviews || reviews.length === 0) {
    throw new NotFoundError("Reviews");
  }

  return reviews;
};

export default getReviews;
