import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailListRouter = createTRPCRouter({
  postEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.emailList.create({
        data: {
          email: input.email,
        },
      });
      return {
        email: input.email,
      };
    }),
});
