import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();

  const deletedReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedReview || deletedReview.count === 0) {
    throw new NotFoundError("Review", id);
  }

  return id;
};
export default deleteReviewById;
