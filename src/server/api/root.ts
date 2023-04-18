import { kingTournamentsRouter } from "server/api/routers/kingTournaments";
import { participantRouter } from "server/api/routers/participant";
import { resetPasswordRouter } from "server/api/routers/passwordReset";
import { teamsTournamentsRouter } from "server/api/routers/teamsTournaments";
import { tournamentsRouter } from "server/api/routers/tournaments";
import { usersRouter } from "server/api/routers/users";
import { createTRPCRouter } from "server/api/trpc";
import { stripeRouter } from "./routers/stripe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  stripe: stripeRouter,
  tournaments: tournamentsRouter,
  participant: participantRouter,
  resetPassword: resetPasswordRouter,
  kingTournaments: kingTournamentsRouter,
  teamsTournaments: teamsTournamentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
