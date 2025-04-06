import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import authMiddleware from "../middleware/auth.js";
import NotFoundError from "../error/notFoundError.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import updateReview from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      res.status(200).json(property);
    } catch (error) {
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
      const { location, pricePerNight, amenities } = req.query;

      console.log("req params", req.query);
      const properties = await getProperties(
        location,
        pricePerNight,
        amenities
      );

      res.status(200).json(properties);
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
    const {
      id,
      bathRoomCount,
      bedroomCount,
      description,
      location,
      maxGuestCount,
      pricePerNight,
      rating,
      title,
      hostId,
    } = req.body;
    const newProperty = await createProperty(
      id,
      bathRoomCount,
      bedroomCount,
      description,
      location,
      maxGuestCount,
      pricePerNight,
      rating,
      title,
      hostId
    );
    res.status(201).json(newProperty);
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
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      } = req.body;
      const updatedProperty = await updateProperty(
        id,
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating
      );
      res.status(200).json(updatedProperty);
    } catch (error) {
      console.log("Update property error:", error);
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
      const deletedProperty = await deletePropertyById(id);

      res.status(200).json({
        message: `Property with id ${deletedProperty} was deleted!`,
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
