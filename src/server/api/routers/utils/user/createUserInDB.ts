import type { PrismaClient } from "@prisma/client";

const createUserInDB = async ({
  user,
  prisma,
}: {
  user: {
    email: string;
    expiresAt?: Date;
    country?: string;
    lastName: string;
    firstName: string;
    stripeCustomerId?: string;
    subscriptionStatus?: string;
    subscriptionTrialEnd?: Date;
    stripeSubscriptionId?: string;
  };
  prisma: PrismaClient;
}) => {
  const newUser = await prisma.user.upsert({
    where: { stripeCustomerId: user.stripeCustomerId },
    update: user,
    create: user,
  });

  return { user: newUser };
};

export default createUserInDB;
