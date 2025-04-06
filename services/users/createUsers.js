import { PrismaClient } from "@prisma/client";

const createUser = async (email, name , password, phoneNumber , pictureUrl, username, id) => {
  const prisma = new PrismaClient()

  return prisma.user.create({
    data: {
        email,
        name,
        password,
        phoneNumber,
        pictureUrl,
        username,
        id
    }
  })
}

export default createUser