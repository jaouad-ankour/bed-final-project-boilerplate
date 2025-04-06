import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import authMiddleware from "../middleware/auth.js";
import NotFoundError from "../error/notFoundError.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenity from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);

      res.status(200).json(amenity);
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
      const amenities = await getAmenities();

      res.status(200).json(amenities);
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
  console.log("req", req.body);
  try {
    const { id, name } = req.body;
    const newAmenity = await createAmenity(id, name);
    res.status(201).json(newAmenity);
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
      const { name } = req.body;
      const updatedAmenity = await updateAmenity(id, name);
      res.status(200).json(updatedAmenity);
    } catch (error) {
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
      const deletedAmenity = await deleteAmenityById(id);

      res.status(200).json({
        message: `Amenity with id ${deletedAmenity} was deleted!`,
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
