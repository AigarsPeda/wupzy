import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import createToken from "utils/createToken";
import hashPassword from "utils/hashPassword";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  signUpUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        lastName: z.string(),
        password: z.string(),
        firstName: z.string(),
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

      const user = await ctx.prisma.user.create({
        data: {
          password,
          email: input.email,
          lastName: input.lastName,
          firstName: input.firstName,
        },
      });

      const token = createToken(user.id);

      // Save token to db
      await ctx.prisma.loginToken.create({
        data: {
          token,
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

      const password = await hashPassword(input.password);

      if (password instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error hashing password",
        });
      }

      if (password !== input.password) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const token = createToken(user.id);

      // Save token to db
      await ctx.prisma.loginToken.create({
        data: {
          token,
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
});
