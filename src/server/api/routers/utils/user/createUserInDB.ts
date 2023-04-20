import type { PrismaClient } from "@prisma/client";

import type Stripe from "stripe";

const createUserInDB = async ({
  stripe,
  prisma,
  sessionId,
}: {
  stripe: Stripe;
  prisma: PrismaClient;
  sessionId: string;
}) => {
  const sessionData = await stripe.checkout.sessions.retrieve(sessionId);

  const subscription = await stripe.subscriptions.retrieve(
    sessionData.subscription as string
  );

  const customer = sessionData.customer_details;

  const email = customer?.email ?? "";
  const lastName = customer?.name?.split(" ")[1] ?? "";
  const firstName = customer?.name?.split(" ")[0] ?? "";

  console.log("subscription", subscription);

  const user = await prisma.user.upsert({
    where: {
      stripeCustomerId: sessionData.customer as string,
    },
    update: {
      lastName: lastName,
      firstName: firstName,
      country: customer?.address?.country,
      subscriptionStatus: subscription.status,
      // stripeSubscriptionStatus: sessionData.status,
      stripeCustomerId: sessionData.customer as string,
      stripeSubscriptionId: sessionData.subscription as string,
      expiresAt: new Date(subscription.current_period_end * 1000),
    },
    create: {
      email: email,
      lastName: lastName,
      firstName: firstName,
      country: customer?.address?.country,
      subscriptionStatus: subscription.status,
      // stripeSubscriptionStatus: sessionData.status,
      stripeCustomerId: sessionData.customer as string,
      stripeSubscriptionId: sessionData.subscription as string,
      expiresAt: new Date(subscription.current_period_end * 1000),
    },
  });

  return user;
};

export default createUserInDB;
