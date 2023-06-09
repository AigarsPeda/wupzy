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
    .mutation(({ ctx, input }) => {
      console.log("input", input);
    }),
});
