// import { PrismaClient } from "@prisma/client";

// const getProperties = async () => {
//   const prisma = new PrismaClient();

//   return prisma.property.findMany({
//     select: {
//       amenities: true,
//       bathRoomCount: true,
//       bedroomCount: true,
//       bookings: true,
//       description: true,
//       host: true,
//       hostId: true,
//       id: true,
//       location: true,
//       maxGuestCount: true,
//       pricePerNight: true,
//       rating: true,
//       reviews: true,
//       title: true,
//     },
//   });
// };
// export default getProperties;

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/notFoundError.js"; // optioneel

const prisma = new PrismaClient();

const getProperties = async (location, pricePerNight, amenities) => {
  console.log("params", location, pricePerNight, amenities);

  const properties = await prisma.property.findMany({
    where: {
      ...(location && {
        location: {
          contains: location,
          mode: "insensitive",
        },
      }),
      ...(pricePerNight && {
        pricePerNight: parseFloat(pricePerNight),
      }),
      ...(amenities && {
        amenities: {
          some: {
            name: {
              equals: amenities,
              mode: "insensitive",
            },
          },
        },
      }),
    },
    select: {
      amenities: true,
      bathRoomCount: true,
      bedroomCount: true,
      bookings: true,
      description: true,
      host: true,
      hostId: true,
      id: true,
      location: true,
      maxGuestCount: true,
      pricePerNight: true,
      rating: true,
      reviews: true,
      title: true,
    },
  });

  if (!properties || properties.length === 0) {
    throw new NotFoundError("Properties", location || "all");
  }

  return properties;
};

export default getProperties;
