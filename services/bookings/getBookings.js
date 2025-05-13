// import { PrismaClient } from "@prisma/client";

// const getBookings = async (userId) => {
//   const prisma = new PrismaClient();

//   return prisma.booking.findMany({
//     where: {
//       ...(userId && {
//         userId: {
//           contains: userId,
//         },
//       }),
//     },
//     select: {
//       bookingStatus: true,
//       checkinDate: true,
//       checkoutDate: true,
//       id: true,
//       numberOfGuests: true,
//       property: true,
//       propertyId: true,
//       totalPrice: true,
//       userId: true,
//     },
//   });
// };
// export default getBookings;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // als je dit hebt

const prisma = new PrismaClient(); // hergebruik dit bij voorkeur in een aparte prisma.js

const getBookings = async (userId) => {
  const bookings = await prisma.booking.findMany({
    where: {
      ...(userId && {
        userId: {
          contains: userId, // let op: alleen als userId een string is
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
      userId: true,
    },
  });

  if (!bookings || bookings.length === 0) {
    throw new NotFoundError("Booking(s)", userId);
  }

  return bookings;
};

export default getBookings;
