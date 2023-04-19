import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import stripe from "server/stripe/client";
import { z } from "zod";
import hashPassword from "../../../utils/hashPassword";
import type Stripe from "stripe";
import createToken from "../../../utils/createToken";

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
      const { stripe } = ctx;
      const defaultPassword = "w12rweriu-%yhwrZ@";

      const sessionData = await stripe.checkout.sessions.retrieve(
        input.sessionId
      );

      const customer = sessionData.customer_details;

      const email = customer?.email ?? "";
      const lastName = customer?.name?.split(" ")[1] ?? "";
      const firstName = customer?.name?.split(" ")[0] ?? "";

      const password = await hashPassword(defaultPassword);

      if (password instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error hashing password",
        });
      }

      // create or update user
      const user = await ctx.prisma.user.upsert({
        where: {
          stripeCustomerId: sessionData.customer as string,
        },
        update: {
          lastName: lastName,
          firstName: firstName,
          country: customer?.address?.country,
          stripeSubscriptionStatus: sessionData.status,
          subscription: sessionData.subscription as string,
          stripeCustomerId: sessionData.customer as string,
          stripeSubscriptionId: sessionData.subscription as string,
        },
        create: {
          email: email,
          lastName: lastName,
          firstName: firstName,
          country: customer?.address?.country,
          stripeSubscriptionStatus: sessionData.status,
          subscription: sessionData.subscription as string,
          stripeCustomerId: sessionData.customer as string,
          stripeSubscriptionId: sessionData.subscription as string,
        },
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
