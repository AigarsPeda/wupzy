import type { PrismaClient } from "@prisma/client";

const createUpdatePassword = async (
  id: string,
  password: string,
  prisma: PrismaClient
) => {
  await prisma.password.upsert({
    where: {
      userId: id,
    },
    update: {
      password: password,
    },
    create: {
      password: password,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
};

export default createUpdatePassword;
