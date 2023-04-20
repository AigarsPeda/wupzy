import { TRPCError } from "@trpc/server";
import createUserInDB from "server/api/routers/utils/user/createUserInDB";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripe, req } = ctx;

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? `http://${req.headers.host ?? "localhost:3000"}`
          : `https://${req.headers.host ?? "localhost:3000"}`;

      return stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price: input.priceId,
          },
        ],

        success_url: `${baseUrl}/signup?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/`,
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
