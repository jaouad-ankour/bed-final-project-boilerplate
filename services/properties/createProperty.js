import { PrismaClient } from "@prisma/client";

const createProperty = async (
  bathRoomCount,
  bedroomCount,
  description,
  location,
  maxGuestCount,
  pricePerNight,
  rating,
  title,
  hostId
) => {
  const prisma = new PrismaClient();

  return prisma.property.create({
    data: {
      bathRoomCount,
      bedroomCount,
      description,
      location,
      maxGuestCount,
      pricePerNight,
      rating,
      title,
      hostId,
    },
  });
};

export default createProperty;
