import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();

  return prisma.review.findMany({
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
};
export default getReviews;
