import { kingTournamentsRouter } from "server/api/routers/kingTournaments";
import { participantRouter } from "server/api/routers/participant";
import { teamsTournamentsRouter } from "server/api/routers/teamsTournaments";
import { tournamentsRouter } from "server/api/routers/tournaments";
import { usersRouter } from "server/api/routers/users";
import { createTRPCRouter } from "server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  tournaments: tournamentsRouter,
  participant: participantRouter,
  kingTournaments: kingTournamentsRouter,
  teamsTournaments: teamsTournamentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
