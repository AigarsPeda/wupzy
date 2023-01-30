import { TRPCError } from "@trpc/server";
import { serverEnv } from "env/schema.mjs";
import jwt from "jsonwebtoken";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import { z } from "zod";

const jwtSecret = serverEnv.JWT_SECRET || "jwtSecret";

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

      const token = jwt.sign({ user }, jwtSecret, { algorithm: "HS256" });

      console.log("token ---->", token);

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
