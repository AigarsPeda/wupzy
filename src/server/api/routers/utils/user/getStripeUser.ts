import type Stripe from "stripe";

const getStripeUser = async ({
  stripe,
  sessionId,
}: {
  stripe: Stripe;
  sessionId: string;
}) => {
  const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
  const stripeSubscriptionId = sessionData.subscription as string;

  const subscription = await stripe.subscriptions.retrieve(
    stripeSubscriptionId
  );

  const customer = sessionData.customer_details;

  const email = customer?.email ?? "";
  const subscriptionStatus = subscription.status;
  const country = customer?.address?.country ?? "";
  const subscriptionTrialEnd = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : undefined;
  const lastName = customer?.name?.split(" ")[1] ?? "";
  const firstName = customer?.name?.split(" ")[0] ?? "";
  const stripeCustomerId = sessionData.customer as string;
  const expiresAt = new Date(subscription.current_period_end * 1000);

  return {
    email: email,
    country: country,
    lastName: lastName,
    firstName: firstName,
    expiresAt: expiresAt,
    stripeCustomerId: stripeCustomerId,
    subscriptionStatus: subscriptionStatus,
    stripeSubscriptionId: stripeSubscriptionId,
    subscriptionTrialEnd: subscriptionTrialEnd,
  };
};

export default getStripeUser;
