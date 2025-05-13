import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!booking || booking.length === 0) {
    throw new NotFoundError("Booking", id);
  }

  return booking;
};

export default getBookingById;
