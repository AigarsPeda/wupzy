import { TRPCError } from "@trpc/server";
import createIdsArrays from "server/api/routers/utils/createIdsArrays";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { GamesZodSchema } from "types/game.types";
import { TeamsAttendantMapZodSchema } from "types/team.types";
import createAllPossiblePairsInGroup from "utils/createAllPossiblePairsInGroup";
import createGames from "utils/createGames";
import createTeamsGames from "utils/createTeamsGames";
import { z } from "zod";
import createGamesForOneTeam from "../../../utils/createGamesForOneTeam";

const START_GROUP = "A";

export const tournamentsRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const tournaments = await ctx.prisma.tournament.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return { tournaments };
  }),

  createKingTournament: protectedProcedure
    .input(z.object({ name: z.string(), attendants: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
        data: {
          name: input.name,
          userId: ctx.user.id,
        },
      });

      const data = input.attendants.map((attendant) => {
        return {
          name: attendant,
          group: START_GROUP,
          tournamentId: tournament.id,
        };
      });

      await ctx.prisma.participant.createMany({
        data,
      });

      const participants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      const participantsMap = createAllPossiblePairsInGroup(
        participants,
        START_GROUP
      );
      const gamesMap = createGames(participantsMap);

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          const team1 = await ctx.prisma.team.create({
            data: {
              group,
              name: `Team 1`,
              tournamentId: tournament.id,
              participants: {
                connect: [...firsIds],
              },
            },
          });

          const team2 = await ctx.prisma.team.create({
            data: {
              group,
              name: `Team 2`,
              tournamentId: tournament.id,
              participants: {
                connect: [...secondIds],
              },
            },
          });

          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: index + 1,
              tournamentId: tournament.id,
              team1Id: team1.id,
              team2Id: team2.id,
              participants: {
                connect: [...firsIds, ...secondIds],
              },
            },
          });
        }
      );

      return { tournament };
    }),

  updateTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        teamName: z.string(),
        tournamentId: z.string(),
        participants: z
          .object({
            id: z.string(),
            name: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (let i = 0; i < input.participants.length; i++) {
        const participant = input.participants[i];

        if (!participant) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Team member not found",
          });
        }

        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            name: participant.name,
          },
        });
      }

      const team = await ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          name: input.teamName,
        },
      });

      return { team };
    }),

  addTeamToTournament: protectedProcedure
    .input(
      z.object({
        group: z.string(),
        teamName: z.string(),
        tournamentId: z.string(),
        participants: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const teamIds: {
        id: string;
      }[] = [];

      for (let i = 0; i < input.participants.length; i++) {
        const participants = input.participants[i];

        if (!participants) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Team member not found",
          });
        }

        const createdParticipant = await ctx.prisma.participant.create({
          data: {
            name: participants,
            group: input.group,
            tournamentId: input.tournamentId,
          },
          select: {
            id: true,
          },
        });

        teamIds.push(createdParticipant);
      }

      // old teams
      const oldTeams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      // create team
      const team = await ctx.prisma.team.create({
        data: {
          name: input.teamName,
          group: input.group,
          tournamentId: input.tournamentId,
          participants: {
            connect: teamIds,
          },
        },
        include: {
          participants: true,
        },
      });

      const lastOrderNumber = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "desc",
        },
        take: 1,
      });

      const gameOrder = lastOrderNumber[0]?.gameOrder || 0;

      await createGamesForOneTeam({
        team,
        teams: oldTeams,
        gameOrder: gameOrder + 1,
        callback: async (
          firstTeamIds,
          secondTeamIds,
          firstTeamId,
          secondTeamId,
          gameOrder
        ) => {
          await ctx.prisma.games.create({
            data: {
              gameOrder,
              group: input.group,
              team1Id: firstTeamId,
              team2Id: secondTeamId,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...firstTeamIds, ...secondTeamIds],
              },
            },
          });
        },
      });

      return { team };
    }),

  createTeamsTournament: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        teams: TeamsAttendantMapZodSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
        data: {
          type: "TEAMS",
          name: input.name,
          userId: ctx.user.id,
        },
      });

      for (const teamName of input.teams.keys()) {
        const teamMembers = input.teams.get(teamName);

        const teamIds: {
          id: string;
        }[] = [];

        if (!teamMembers) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Team members not found",
          });
        }

        for (let j = 0; j < teamMembers.length; j++) {
          const teamMember = teamMembers[j];

          if (!teamMember) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Team member not found",
            });
          }

          const createdParticipant = await ctx.prisma.participant.create({
            data: {
              name: teamMember?.name,
              group: START_GROUP,
              tournamentId: tournament.id,
            },
            select: {
              id: true,
            },
          });

          teamIds.push(createdParticipant);
        }

        await ctx.prisma.team.create({
          data: {
            name: teamName,
            group: START_GROUP,
            tournamentId: tournament.id,
            participants: {
              connect: [...teamIds],
            },
          },
        });
      }

      const teams = await ctx.prisma.team.findMany({
        where: {
          tournamentId: tournament.id,
        },
        include: {
          participants: true,
        },
      });

      await createTeamsGames(
        teams,
        async (
          firstTeamIds,
          secondTeamIds,
          firstTeamId,
          secondTeamId,
          gameOrder
        ) => {
          await ctx.prisma.games.create({
            data: {
              gameOrder,
              group: START_GROUP,
              team1Id: firstTeamId,
              team2Id: secondTeamId,
              tournamentId: tournament.id,
              participants: {
                connect: [...firstTeamIds, ...secondTeamIds],
              },
            },
          });
        }
      );

      return { tournament };
    }),

  getTournamentGames: protectedProcedure
    .input(z.object({ tournamentId: z.string(), group: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const games = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "asc",
        },
        include: {
          team1: {
            include: {
              participants: true,
            },
          },
          team2: {
            include: {
              participants: true,
            },
          },
          winners: true,
        },
      });

      return { games };
    }),

  getTournamentTeams: protectedProcedure
    .input(z.object({ tournamentId: z.string(), group: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const teams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      return { teams };
    }),

  changeTeamsGroup: protectedProcedure
    .input(
      z.object({
        group: z.string(),
        teamId: z.string(),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // delete all games for this team
      await ctx.prisma.games.deleteMany({
        where: {
          OR: [{ team1Id: input.teamId }, { team2Id: input.teamId }],
        },
      });

      // get all teams for this tournament
      const oldTeams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      // update team group
      const team = await ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },

        data: {
          group: input.group,
        },
        include: {
          participants: true,
        },
      });

      // How to update participants group ???
      for (let i = 0; i < team.participants.length; i++) {
        const participant = team.participants[i];

        if (!participant) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Participant not found",
          });
        }

        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            group: input.group,
          },
        });
      }

      const lastOrderNumber = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "desc",
        },
        take: 1,
      });

      const gameOrder = lastOrderNumber[0]?.gameOrder || 0;

      await createGamesForOneTeam({
        team,
        teams: oldTeams,
        gameOrder: gameOrder + 1,
        callback: async (
          firstTeamIds,
          secondTeamIds,
          firstTeamId,
          secondTeamId,
          gameOrder
        ) => {
          await ctx.prisma.games.create({
            data: {
              gameOrder,
              group: input.group,
              team1Id: firstTeamId,
              team2Id: secondTeamId,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...firstTeamIds, ...secondTeamIds],
              },
            },
          });
        },
      });
    }),

  updateGameOrder: protectedProcedure
    .input(
      z.object({
        games: GamesZodSchema.array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction(
        input.games.map((game) => {
          return ctx.prisma.games.update({
            where: {
              id: game.id,
            },
            data: {
              gameOrder: game.gameOrder,
            },
          });
        })
      );
    }),

  updateGamScore: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        winnerTeamIds: z.array(z.string()).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const winnerIds = input.winnerTeamIds?.map((id) => {
        return {
          id: id,
        };
      });

      const game = await ctx.prisma.games.update({
        where: {
          id: input.id,
        },
        data: {
          team1Score: input.team1Score,
          team2Score: input.team2Score,
          team1: {
            update: {
              score: {
                increment: input.team1Score,
              },
            },
          },
          team2: {
            update: {
              score: {
                increment: input.team2Score,
              },
            },
          },
          winners: {
            connect: winnerIds,
          },
        },

        include: {
          team1: {
            include: {
              participants: true,
            },
          },
          team2: {
            include: {
              participants: true,
            },
          },
        },
      });

      for (const participant of game.team1.participants) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            score: participant.score + input.team1Score,
          },
        });
      }

      for (const participant of game.team2.participants) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            score: participant.score + input.team2Score,
          },
        });
      }

      return { game };
    }),

  getTournamentById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!tournament) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tournament not found",
        });
      }

      return { tournament };
    }),

  updateTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      return { tournament };
    }),
});
