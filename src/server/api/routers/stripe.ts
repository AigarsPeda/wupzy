import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import stripe from "server/stripe/client";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async () => {
    const products = await stripe.prices.list({
      limit: 10,
      active: true,
      expand: ["data.product"],
    });

    return {
      products,
    };
  }),

  createCheckoutSession: publicProcedure
    .input(
      z.object({
        priceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripe, session, prisma, req } = ctx;

      // env.NODE_ENV === "development"

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? `http://${req.headers.host ?? "localhost:3000"}`
          : `https://${req.headers.host ?? "localhost:3000"}`;

      console.log("baseUrl --->>", baseUrl);

      return stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price: input.priceId,
          },
        ],

        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/`,
      });

      // const customerId = await getOrCreateStripeCustomerIdForUser({
      //   prisma,
      //   stripe,
      //   userId: session.user?.id,
      // });

      // if (!customerId) {
      //   throw new Error("Could not create customer");
      // }

      // const baseUrl =
      //   env.NODE_ENV === "development"
      //     ? `http://${req.headers.host ?? "localhost:3000"}`
      //     : `https://${req.headers.host ?? env.NEXTAUTH_URL}`;

      // const checkoutSession = await stripe.checkout.sessions.create({
      //   customer: customerId,
      //   client_reference_id: session.user?.id,
      //   payment_method_types: ["card"],
      //   mode: "subscription",
      //   line_items: [
      //     {
      //       price: env.STRIPE_PRICE_ID,
      //       quantity: 1,
      //     },
      //   ],
      //   success_url: `${baseUrl}/dashboard?checkoutSuccess=true`,
      //   cancel_url: `${baseUrl}/dashboard?checkoutCanceled=true`,
      //   subscription_data: {
      //     metadata: {
      //       userId: session.user?.id,
      //     },
      //   },
      // });

      // if (!checkoutSession) {
      //   throw new Error("Could not create checkout session");
      // }

      // return { checkoutUrl: checkoutSession.url };
    }),

  getStripeSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { stripe, session, prisma, req } = ctx;

      const sessionData = await stripe.checkout.sessions.retrieve(
        input.sessionId
      );

      console.log("sessionData --->>", sessionData);

      return sessionData;
    }),
  // createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
  //   const { stripe, session, prisma, req } = ctx;

  //   const customerId = await getOrCreateStripeCustomerIdForUser({
  //     prisma,
  //     stripe,
  //     userId: session.user?.id,
  //   });

  //   if (!customerId) {
  //     throw new Error("Could not create customer");
  //   }

  //   const baseUrl =
  //     env.NODE_ENV === "development"
  //       ? `http://${req.headers.host ?? "localhost:3000"}`
  //       : `https://${req.headers.host ?? env.NEXTAUTH_URL}`;

  //   const stripeBillingPortalSession =
  //     await stripe.billingPortal.sessions.create({
  //       customer: customerId,
  //       return_url: `${baseUrl}/dashboard`,
  //     });

  //   if (!stripeBillingPortalSession) {
  //     throw new Error("Could not create billing portal session");
  //   }

  //   return { billingPortalUrl: stripeBillingPortalSession.url };
  // }),
});
