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
});
