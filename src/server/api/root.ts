import { emailListRouter } from "~/server/api/routers/emailList";
import { exampleRouter } from "~/server/api/routers/example";
import { gameRouter } from "~/server/api/routers/games";
import { playerRouter } from "~/server/api/routers/players";
import { teamRouter } from "~/server/api/routers/teams";
import { tournamentRouter } from "~/server/api/routers/tournament";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  emailListRouter,
  user: userRouter,
  game: gameRouter,
  teams: teamRouter,
  player: playerRouter,
  example: exampleRouter,
  tournament: tournamentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
