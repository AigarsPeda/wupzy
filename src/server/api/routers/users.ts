import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";
import comparePassword from "utils/comparePassword";
import createToken from "utils/createToken";
import hashPassword from "utils/hashPassword";
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET || "jwtSecret";

export const usersRouter = createTRPCRouter({
  signUpUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        lastName: z.string(),
        password: z.string(),
        firstName: z.string(),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const password = await hashPassword(input.password);

      if (password instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error hashing password",
        });
      }

      const user = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          email: input.email,
          lastName: input.lastName,
          firstName: input.firstName,
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

      // Save token to db
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
      };
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const password = await ctx.prisma.password.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!password) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const isMatch = await comparePassword(input.password, password.password);

      if (!isMatch) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const token = createToken(user.id);

      // Save token to db
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
      };
    }),

  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { prisma, stripe } = ctx;

    const user = await prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      select: {
        id: true,
        email: true,
        lastName: true,
        firstName: true,
        expiresAt: true,
        stripeCustomerId: true,
        subscriptionStatus: true,
        stripeSubscriptionId: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    // check if users subscription is not expired
    if (user.expiresAt && user.expiresAt < new Date()) {
      // check if user has a stripe customer id
      if (user.stripeSubscriptionId) {
        // check if user has a stripe subscription
        const subscription = await stripe.subscriptions.retrieve(
          user.stripeSubscriptionId
        );

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: subscription.status,
            expiresAt: new Date(subscription.current_period_end * 1000),
          },
        });
      }
    }

    return {
      user,
    };
  }),

  logoutUser: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    await ctx.prisma.loginToken.update({
      where: {
        token: ctx.token,
      },
      data: {
        isActive: false,
      },
    });

    return {
      message: "Logged out successfully",
    };
  }),

  changePassword: publicProcedure
    .input(
      z.object({
        token: z.string(),
        userId: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resetToken = await ctx.prisma.passwordReset.findUnique({
        where: {
          token: input.token,
        },
      });

      if (!resetToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reset not found",
        });
      }

      const decoded = jwt.verify(resetToken.token, jwtSecret) as {
        userId?: string;
      };

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user || user.id !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const password = await hashPassword(input.password);

      if (password instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error hashing password",
        });
      }

      await ctx.prisma.password.update({
        where: {
          userId: input.userId,
        },
        data: {
          password,
        },
      });

      await ctx.prisma.passwordReset.delete({
        where: {
          token: input.token,
        },
      });

      return {
        message: "Password changed successfully",
      };
    }),
});
