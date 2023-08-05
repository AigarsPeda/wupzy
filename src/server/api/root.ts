import { emailListRouter } from "~/server/api/routers/emailList";
import { gameRouter } from "~/server/api/routers/games";
import { playerRouter } from "~/server/api/routers/players";
import { playoffsRouter } from "~/server/api/routers/playoffs";
import { shareLinkRouter } from "~/server/api/routers/shareLink";
import { stripeRouter } from "~/server/api/routers/stripe";
import { teamRouter } from "~/server/api/routers/teams";
import { tournamentRouter } from "~/server/api/routers/tournament";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

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
  stripe: stripeRouter,
  player: playerRouter,
  playoffs: playoffsRouter,
  shareLink: shareLinkRouter,
  tournament: tournamentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
