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

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  console.log("params", location, pricePerNight, amenities);

  return prisma.property.findMany({
    where: {
      ...(location && {
        location: {
          contains: location,
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
};

export default getProperties;
