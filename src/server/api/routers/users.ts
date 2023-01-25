import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        lastName: z.string(),
        password: z.string(),
        firstName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          lastName: input.lastName,
          password: input.password,
          firstName: input.firstName,
        },
      });
    }),
});
