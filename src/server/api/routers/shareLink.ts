import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const shareLinkRouter = createTRPCRouter({
  getTournament: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const shareLink = await prisma.shareLink.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          tournament: true,
        },
      });

      return { shareLink };
    }),
});
