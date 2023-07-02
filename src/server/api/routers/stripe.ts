import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import getOrCreateStripeCustomerIdForUser from "~/server/stripe/utils/getOrCreateStripeCustomerIdForUser";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripe, req, prisma, session } = ctx;

      const customerId = await getOrCreateStripeCustomerIdForUser({
        prisma,
        stripe,
        userId: session.user?.id,
      });

      if (!customerId) {
        throw new Error("Could not create customer");
      }

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? `http://${req.headers.host ?? "localhost:3000"}`
          : `https://${req.headers.host ?? "localhost:3000"}`;

      const successUrl = `${baseUrl}/signup?session_id={CHECKOUT_SESSION_ID}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: session.user?.id,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: `${baseUrl}/`,
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
});
