import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          lastName: input.lastName,
          password: input.password,
          firstName: input.firstName,
        },
      });

      return user;
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

      if (user.password !== input.password) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },

          token: "token222232323",
        },
      });

      return user;
    }),
});
