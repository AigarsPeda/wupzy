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
          tournament: {
            include: {
              games: {
                include: {
                  teamOne: {
                    include: {
                      players: true,
                    },
                  },
                  teamTwo: {
                    include: {
                      players: true,
                    },
                  },
                },
                orderBy: [{ round: "asc" }, { order: "asc" }],
              },
              teams: true,
              players: true,
            },
          },
        },
      });

      if (!shareLink) {
        throw new Error("Share link not found");
      }

      const groups = new Set<string>();
      for (const game of shareLink?.tournament.games) {
        groups.add(game.teamOne.group);
      }

      // return { games, groups: [...groups] };

      return {
        tournament: shareLink?.tournament,
        games: shareLink?.tournament.games,
        groups: [...groups],
      };
    }),
});
