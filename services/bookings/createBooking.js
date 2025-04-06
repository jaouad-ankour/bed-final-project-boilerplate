import { PrismaClient } from "@prisma/client";

const createBooking = async (bookingStatus,
    checkoutDate,
    checkinDate,
    numberOfGuests,
    totalPrice,
    propertyId,
    userId,
    id
) => {
  const prisma = new PrismaClient()

  return prisma.booking.create({
    data: {
      bookingStatus,
      checkoutDate,
      checkinDate,
      numberOfGuests,
      totalPrice,
      propertyId,
      userId,
      id,
    }
  })
}

export default createBooking