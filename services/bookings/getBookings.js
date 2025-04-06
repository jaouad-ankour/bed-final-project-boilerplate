import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();

  return prisma.booking.findMany({
    where: {
      ...(userId && {
        userId: {
          contains: userId,
        },
      }),
    },
    select: {
      bookingStatus: true,
      checkinDate: true,
      checkoutDate: true,
      id: true,
      numberOfGuests: true,
      property: true,
      propertyId: true,
      totalPrice: true,
    },
  });
};
export default getBookings;
