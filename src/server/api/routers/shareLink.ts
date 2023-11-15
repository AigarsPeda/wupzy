import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const shareLinkRouter = createTRPCRouter({
  getTournament: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const shareLink = await prisma.tournament.findUnique({
        where: {
          shareLink: input.slug,
        },
        select: {
          name: true,
          type: true,
          isPlayoffs: true,
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
          teams: {
            include: {
              players: true,
            },
            orderBy: [
              { gamesWon: "desc" },
              { setsWon: "desc" },
              { points: "desc" },
            ],
          },
          players: true,
        },
      });

      if (!shareLink) {
        throw new Error("Share link not found");
      }

      const groups = new Set<string>();
      for (const game of shareLink?.games) {
        groups.add(game.teamOne.group);
      }

      return {
        groups: [...groups],
        tournament: shareLink,
        games: shareLink?.games,
        teams: shareLink?.teams,
        players: shareLink?.players,
      };
    }),

  getSharePlayoff: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          shareLink: input.slug,
        },
        select: {
          playoffGame: {
            include: {
              teamOne: true,
              teamTwo: true,
            },
            orderBy: [{ round: "asc" }, { match: "asc" }],
          },
        },
      });

      return { playoffGames: tournament?.playoffGame };
    }),
});
