import { ONE_TOURNAMENT_COST } from "hardcoded";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGamesNTimes from "~/server/api/utils/createGamesNTimes";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import { NewTournamentSchema } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";

export const tournamentRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const tournaments = await prisma.tournament.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { tournaments };
  }),

  getTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
        include: {
          shareLink: true,
        },
      });

      return { tournament };
    }),

  updateTournamentToPro: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (user && user.credits < ONE_TOURNAMENT_COST) {
        throw new Error("Not enough credits");
      }

      const tournament = await prisma.tournament.update({
        where: {
          id: input.id,
        },
        data: {
          kind: "PRO",
          shareLink: {
            connectOrCreate: {
              where: {
                tournamentId: input.id,
              },
              create: {
                slug: uuidv4(),
              },
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: ONE_TOURNAMENT_COST,
          },
        },
      });

      return { tournament };
    }),

  postNewTournament: protectedProcedure
    .input(NewTournamentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      if (input.kind === "king") {
        const { players, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            rounds: input.rounds,
            userId: ctx.session.user.id,
            players: {
              create: input.king.players.map((player) => ({
                name: player.name,
                group: player.group,
              })),
            },
          },
          include: {
            players: true,
          },
        });

        const newTeams = createTeams(players);

        for (let i = 0; i < newTeams.length; i++) {
          const element = newTeams[i];

          if (element) {
            await prisma.team.create({
              data: {
                tournamentId: id,
                // name: element.name,
                group: element.group,
                players: {
                  connect: element.players.map((player) => ({
                    id: player.id,
                  })),
                },
              },
            });
          }
        }

        const teams = await prisma.team.findMany({
          where: {
            tournamentId: id,
          },
          include: {
            players: true,
          },
        });

        await prisma.game.createMany({
          data: createKingGamesNTimes(teams, id, input.rounds),
        });

        return { id };
      } else {
        const { teams, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            rounds: input.rounds,
            userId: ctx.session.user.id,
            teams: {
              create: input.teams.map((team) => ({
                name: team.name,
                players: {
                  create: team.players.map((player) => ({
                    name: player.name,
                    group: team.group,
                  })),
                },
              })),
            },
          },
          include: {
            teams: {
              include: {
                players: true,
              },
            },
          },
        });

        await prisma.game.createMany({
          data: createGamesNTimes(teams, id, input.rounds),
        });

        return { id };
      }
    }),

  deleteTournament: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      await prisma.game.deleteMany({
        where: {
          tournamentId: input.id,
        },
      });

      await prisma.tournament.delete({
        where: {
          id: input.id,
        },
      });

      return { id: input };
    }),

  getTournamentToEdit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
        include: {
          players: true,
          teams: {
            include: {
              players: true,
            },
          },
          shareLink: true,
        },
      });

      return { tournament };
    }),

  updateTournament: protectedProcedure
    .input(z.object({ tournament: NewTournamentSchema, id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      if (input.tournament.kind === "king") {
        const oldPlayers = await prisma.player.findMany({
          where: {
            tournamentId: input.id,
          },
        });

        const oldGames = await prisma.game.findMany({
          where: {
            tournamentId: input.id,
          },
        });

        oldGames[0]?.order;

        // loop through old players and if they are updated, update them or create new ones
        const newPlayers = await Promise.all(
          input.tournament.king.players.map(async (player) => {
            return await prisma.player.upsert({
              where: {
                id: player.id,
              },
              update: {
                name: player.name,
                group: player.group,
              },
              create: {
                name: player.name,
                group: player.group,
                tournamentId: input.id,
              },
            });
          })
        );

        if (oldPlayers.length !== newPlayers.length) {
          const newTeams = createTeams(newPlayers);

          // remove newTeams with all players are oldPlayers
          const filteredNewTeams = newTeams.filter((newTeam) => {
            return !newTeam.players.every((newPlayer) => {
              return oldPlayers.some((oldPlayer) => {
                return oldPlayer.id === newPlayer.id;
              });
            });
          });

          // Save new teams
          for (let i = 0; i < filteredNewTeams.length; i++) {
            const element = filteredNewTeams[i];

            if (element) {
              await prisma.team.create({
                data: {
                  tournamentId: input.id,
                  group: element.group,
                  players: {
                    connect: element.players.map((player) => ({
                      id: player.id,
                    })),
                  },
                },
              });
            }
          }

          const teams = await prisma.team.findMany({
            where: {
              tournamentId: input.id,
            },
            include: {
              players: true,
            },
          });

          const newGames = createKingGamesNTimes(
            teams,
            input.id,
            input.tournament.rounds
          );

          // remove games that matches round, order and group
          const filteredNewGames = newGames.filter((newGame) => {
            return !oldGames.some((oldGame) => {
              return (
                oldGame.round === newGame.round &&
                oldGame.order === newGame.order &&
                oldGame.group === newGame.group
              );
            });
          });

          // Create new games
          await prisma.game.createMany({
            data: filteredNewGames,
          });
        }

        return { id: input.id };
      }

      return { id: input.id };
    }),
});
