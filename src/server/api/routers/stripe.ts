import { TRPCError } from "@trpc/server";
import createUserInDB from "server/api/routers/utils/user/createUserInDB";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";
import stripe from "server/stripe/client";
import createToken from "utils/createToken";
import hashPassword from "utils/hashPassword";
import { z } from "zod";

const DEFAULT_PASSWORD = "w12rweriu-%yhwrZ@";

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
        stripeCustomerId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripe, req } = ctx;

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? `http://${req.headers.host ?? "localhost:3000"}`
          : `https://${req.headers.host ?? "localhost:3000"}`;

      const successUrl = `${baseUrl}/signup?session_id={CHECKOUT_SESSION_ID}`;

      return stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price: input.priceId,
          },
        ],
        success_url: successUrl,
        cancel_url: `${baseUrl}/`,
        customer: input.stripeCustomerId,
      });
    }),

  getStripeUser: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { stripe, prisma } = ctx;

      const password = await hashPassword(DEFAULT_PASSWORD);

      if (password instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error hashing password",
        });
      }

      if (!input.sessionId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error session id",
        });
      }

      const user = await createUserInDB({
        stripe,
        prisma,
        sessionId: input.sessionId,
      });

      // create password or update password
      await ctx.prisma.password.upsert({
        where: {
          userId: user.id,
        },
        update: {
          password: password,
        },
        create: {
          password: password,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      const token = createToken(user.id);

      await ctx.prisma.loginToken.create({
        data: {
          token,
          isActive: true,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return {
        token,
        user,
      };
    }),

  // renewSubscription: protectedProcedure.mutation(async ({ ctx }) => {
  //   const { stripe, user, prisma } = ctx;

  //   if (!user.stripeSubscriptionId) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error retrieving subscription",
  //     });
  //   }

  //   const subscription = await stripe.subscriptions.retrieve(
  //     user.stripeSubscriptionId
  //   );

  //   if (!subscription) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error retrieving subscription",
  //     });
  //   }

  //   const subscriptionItems = await stripe.subscriptionItems.list({
  //     subscription: subscription.id,
  //   });

  //   if (!subscriptionItems) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error retrieving subscription items",
  //     });
  //   }

  //   const subscriptionItem = subscriptionItems.data[0];

  //   if (!subscriptionItem) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error retrieving subscription item",
  //     });
  //   }

  //   const price = await stripe.prices.retrieve(subscriptionItem.price.id);

  //   if (!price) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error retrieving price",
  //     });
  //   }

  //   const newSubscription = await stripe.subscriptions.create({
  //     customer: subscription.customer as string,
  //     items: [
  //       {
  //         price: price.id,
  //       },
  //     ],

  //     // success_url: `${baseUrl}/signup?session_id={CHECKOUT_SESSION_ID}`,
  //     // cancel_url: `${baseUrl}/`,

  //     expand: ["latest_invoice.payment_intent"],
  //   });

  //   if (!newSubscription) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error creating subscription",
  //     });
  //   }

  //   await prisma.user.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       subscriptionStatus: newSubscription.status,
  //       stripeSubscriptionId: newSubscription.id,
  //     },
  //   });

  //   return {
  //     subscription,
  //   };
  // }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { stripe, user, prisma } = ctx;

    if (!user.stripeSubscriptionId) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error retrieving subscription",
      });
    }

    const subscription = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );

    if (!subscription) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error retrieving subscription",
      });
    }

    const canceledSubscription = await stripe.subscriptions.del(
      subscription.id
    );

    if (!canceledSubscription) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error canceling subscription",
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        // expiresAt: null,
        // stripeSubscriptionId: null,
        subscriptionStatus: "canceled",
      },
    });

    return {
      subscription: canceledSubscription,
    };
  }),

  // renewSubscription: publicProcedure
  //   .input(
  //     z.object({
  //       subscriptionId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { stripe, prisma } = ctx;

  //     const subscription = await stripe.subscriptions.retrieve(
  //       input.subscriptionId
  //     );

  //     if (!subscription) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Error retrieving subscription",
  //       });
  //     }

  //     const subscriptionItems = await stripe.subscriptionItems.list({
  //       subscription: subscription.id,
  //     });

  //     if (!subscriptionItems) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Error retrieving subscription items",
  //       });
  //     }

  //     const subscriptionItem = subscriptionItems.data[0];

  //     if (!subscriptionItem) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Error retrieving subscription item",
  //       });
  //     }

  //     const price = await stripe.prices.retrieve(subscriptionItem.price.id);

  //     if (!price) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Error retrieving price",
  //       });
  //     }

  //     const newSubscription = await stripe.subscriptions.create({
  //       customer: subscription.customer,
  //       items: [
  //         {
  //           price: price.id,
  //         },
  //       ],
  //       expand: ["latest_invoice.payment_intent"],
  //     });

  //     if (!newSubscription) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Error creating subscription",
  //       });
  //     }

  //     await prisma.user.update({
  //       where: {
  //         stripeSubscriptionId: subscription.id,
  //       },
  //       data: {
  //         stripeSubscriptionId: newSubscription.id,
  //         subscriptionStatus: newSubscription.status,
  //       },
  //     });

  //     return {
  //       subscription: newSubscription,
  //     };
  //   }),
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
