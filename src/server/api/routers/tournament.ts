import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { NewTournamentSchema } from "~/types/tournament.types";

export const tournamentRouter = createTRPCRouter({
  getTournament: protectedProcedure.query(({ ctx }) => {
    return `You can now see this secret message! ${
      ctx.session.user.name || "No name"
    }`;
  }),

  postNewTournament: protectedProcedure
    .input(NewTournamentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      console.log("input", input);

      // TODO: Create teams if "King" tournament BEFORE creating tournament

      // TODO: How to create games?

      await prisma.tournament.create({
        data: {
          type: input.kind,
          name: input.name,
          sets: input.sets,
          userId: ctx.session.user.id,
          teams: {
            create: input.teams.map((team) => ({
              name: team.name,
              players: {
                create: team.players.map((player) => ({
                  name: player.name,
                })),
              },
            })),
          },
        },
      });
    }),
});
