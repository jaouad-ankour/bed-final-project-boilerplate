import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import authMiddleware from "../middleware/auth.js";
import NotFoundError from "../error/notFoundError.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import updateReview from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);

      console.log("review", review);

      res.status(200).json(review);
    } catch (error) {
      console.log("get review error", error);
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get(
  "/",
  async (req, res, next) => {
    try {
      const reviews = await getReviews();

      res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: "Resource not found" });
    }
    next(error);
  }
  notFoundErrorHandler;
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, propertyId, rating, comment } = req.body;
      const updatedHost = await updateReview(
        id,
        userId,
        propertyId,
        rating,
        comment
      );
      res.status(200).json(updatedHost);
    } catch (error) {
      console.log("Error put review:", error);
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedReview = await deleteReviewById(id);

      res.status(200).json({
        message: `Review with id ${deletedReview} was deleted!`,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
