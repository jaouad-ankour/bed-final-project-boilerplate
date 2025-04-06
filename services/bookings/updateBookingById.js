import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";
//hosts, properties, amenities, bookings, and reviews.
const updateBookingById = async (
  id,
  bookingStatus,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  propertyId,
  totalPrice,
  userId
) => {
  const prisma = new PrismaClient();
  const updatedBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      bookingStatus,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      propertyId,
      totalPrice,
      userId,
    },
  });

  if (!updatedBooking || updatedBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
