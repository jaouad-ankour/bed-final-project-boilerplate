import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import authMiddleware from "../middleware/auth.js";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import NotFoundError from "../error/notFoundError.js";
import getBookingById from "../services/bookings/getBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);

      res.status(200).json(booking);
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
      const { userId } = req.query;

      console.log("req query", req.query);
      const bookings = await getBookings(userId);

      res.status(200).json(bookings);
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
    const {
      bookingStatus,
      checkoutDate,
      checkinDate,
      numberOfGuests,
      totalPrice,
      propertyId,
      userId,
      id,
    } = req.body;
    const newBooking = await createBooking(
      bookingStatus,
      checkoutDate,
      checkinDate,
      numberOfGuests,
      totalPrice,
      propertyId,
      userId,
      id
    );
    res.status(201).json(newBooking);
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
        bookingStatus,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        propertyId,
        totalPrice,
        userId,
      } = req.body;
      const updatedUser = await updateBookingById(
        id,
        bookingStatus,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        propertyId,
        totalPrice,
        userId
      );
      res.status(200).json(updatedUser);
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
      const deletedBooking = await deleteBookingById(id);

      res.status(200).json({
        message: `Booking with id ${deletedBooking} was deleted!`,
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
