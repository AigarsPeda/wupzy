import { TRPCError } from "@trpc/server";
import createTeamsGames from "server/api/routers/utils/createTeamsGames";
import filterAllPossibleTeamsGames from "server/api/routers/utils/filterAllPossibleTeamsGames";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { TeamZodSchema, TeamsAttendantMapZodSchema } from "types/team.types";
import shuffleArray from "utils/shuffleArray";
import { z } from "zod";
import getPoints from "./utils/getPoints";

const START_GROUP = "A";

export const teamsTournamentsRouter = createTRPCRouter({
  createTeamsTournament: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        gameSetCount: z.number(),
        teams: TeamsAttendantMapZodSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
        data: {
          type: "TEAMS",
          name: input.name,
          userId: ctx.user.id,
          setsInGame: input.gameSetCount,
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
              group: START_GROUP,
              name: teamMember?.name,
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

      const games = createTeamsGames(teams);
      const shuffledGames = shuffleArray(games);

      for (let i = 0; i < shuffledGames.length; i++) {
        const game = shuffledGames[i];

        if (!game) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Game not found",
          });
        }

        await ctx.prisma.games.create({
          data: {
            gameOrder: i + 1,
            group: START_GROUP,
            team1Id: game.first.teamId,
            team2Id: game.second.teamId,
            tournamentId: tournament.id,
            participants: {
              connect: [
                ...game.first.participants,
                ...game.second.participants,
              ],
            },
          },
        });
      }

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

  deleteTeam: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.games.deleteMany({
        where: {
          OR: [{ team1Id: input.teamId }, { team2Id: input.teamId }],
        },
      });

      const team = await ctx.prisma.team.delete({
        where: {
          id: input.teamId,
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

      const teams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      const gameCount = await ctx.prisma.games.count({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
      });

      const games = createTeamsGames(teams);
      const filteredGames = filterAllPossibleTeamsGames(team.id, games);
      // const shuffledGames = shuffleArray(filteredGames); // TODO: shuffle games

      for (let i = 0; i < filteredGames.length; i++) {
        const game = filteredGames[i];

        if (!game) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Team member not found",
          });
        }

        await ctx.prisma.games.create({
          data: {
            group: team.group,
            gameOrder: gameCount + i,
            team1Id: game.first.teamId,
            team2Id: game.second.teamId,
            tournamentId: input.tournamentId,
            // setsInGameId: tournament?.setsInGameId || "1",
            // gameSetCount: setCount[0]?.gameSetCount || 1,
            participants: {
              connect: [
                ...game.first.participants,
                ...game.second.participants,
              ],
            },
          },
        });
      }

      return { team };
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
          OR: [
            { tournamentId: input.tournamentId, team1Id: input.teamId },
            { tournamentId: input.tournamentId, team2Id: input.teamId },
          ],
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

      const teams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      const gameCount = await ctx.prisma.games.count({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
      });

      const games = createTeamsGames(teams);
      const filteredGames = filterAllPossibleTeamsGames(team.id, games);
      // const shuffledGames = shuffleArray(filteredGames);

      for (let i = 0; i < filteredGames.length; i++) {
        const game = filteredGames[i];

        if (!game) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Game not found",
          });
        }

        await ctx.prisma.games.create({
          data: {
            group: input.group,
            gameOrder: gameCount + i,
            team1Id: game.first.teamId,
            team2Id: game.second.teamId,
            tournamentId: input.tournamentId,

            // setsInGameId: tournament?.setsInGameId || "1",
            participants: {
              connect: [
                ...game.first.participants,
                ...game.second.participants,
              ],
            },
          },
        });
      }

      return { team };
    }),

  createPlayoffGames: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        games: z
          .object({
            stage: z.string(),
            // bracketNum: z.number(),
            team1: z.object({
              team1: TeamZodSchema.nullish(),
            }),
            team2: z.object({
              team2: TeamZodSchema.nullish(),
            }),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const games = input.games;

      const count = await ctx.prisma.playoffGames.count({
        where: {
          tournamentId: input.tournamentId,
        },
      });

      for (let i = 0; i < games.length; i++) {
        const game = games[i];

        if (!game) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Game not found",
          });
        }

        const team1Ids =
          game.team1?.team1?.participants.map((p) => ({ id: p.id })) || [];
        const team2Ids =
          game.team2?.team2?.participants.map((p) => ({ id: p.id })) || [];

        await ctx.prisma.playoffGames.create({
          data: {
            stage: game.stage,
            gameOrder: count + i,
            bracketNum: count + i,
            team1Id: game.team1?.team1?.id,
            team2Id: game.team2?.team2?.id,
            tournamentId: input.tournamentId,
            participants: {
              connect: [...team1Ids, ...team2Ids],
            },
          },
        });
      }

      await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId,
        },
        data: {
          isPlayoff: true,
        },
      });

      // find all games for this tournament without score and add 0-0
      const gamesWithoutScore = await ctx.prisma.games.findMany({
        where: {
          tournamentId: input.tournamentId,
          team1Score: null,
          team2Score: null,
        },
      });

      for (let i = 0; i < gamesWithoutScore.length; i++) {
        const game = gamesWithoutScore[i];
        const team1Score = 0;
        const team2Score = 0;
        const team1Points = 0;
        const team2Points = 0;

        if (!game) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Game not found",
          });
        }

        await ctx.prisma.games.update({
          where: {
            id: game.id,
          },
          data: {
            team1Score: team1Score,
            team2Score: team2Score,
            team1: {
              update: {
                points: {
                  increment: team1Points,
                },
                smallPoints: {
                  increment: team1Score,
                },
              },
            },
            team2: {
              update: {
                points: {
                  increment: team2Points,
                },
                smallPoints: {
                  increment: team2Score,
                },
              },
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
      }
    }),

  getPlayoffGames: protectedProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const games = await ctx.prisma.playoffGames.findMany({
        where: {
          tournamentId: input.tournamentId,
        },
        orderBy: {
          // bracketNum: "asc",
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
        },
      });

      return { games };
    }),

  updatePlayoffGame: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        nextStage: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        tournamentsId: z.string(),
        nextBracketNum: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const nextStage = input.nextStage;
      const team1Score = input.team1Score;
      const team2Score = input.team2Score;
      const { team1Points, team2Points } = getPoints(
        input.team1Score,
        input.team2Score
      );

      const count = await ctx.prisma.playoffGames.count({
        where: {
          stage: nextStage,
          bracketNum: input.nextBracketNum,
          tournamentId: input.tournamentsId,
        },
      });

      const game = await ctx.prisma.playoffGames.findUnique({
        where: {
          id: input.gameId,
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

      if (!game) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Game not found",
        });
      }

      const winnerTeamId =
        team1Points > team2Points ? game.team1Id : game.team2Id;
      const winnerIds: {
        id: string;
      }[] = [];

      if (team1Points > team2Points) {
        game.team1?.participants.forEach((p) => {
          winnerIds.push({ id: p.id });
        });
      }
      if (team2Points > team1Points) {
        game.team2?.participants.forEach((p) => {
          winnerIds.push({ id: p.id });
        });
      }
      if (team2Points === team1Points) {
        game.team1?.participants.forEach((p) => {
          winnerIds.push({ id: p.id });
        });
        game.team2?.participants.forEach((p) => {
          winnerIds.push({ id: p.id });
        });
      }

      await ctx.prisma.playoffGames.update({
        where: {
          id: input.gameId,
        },
        data: {
          team1Score: team1Score,
          team2Score: team2Score,
          team1: {
            update: {
              points: {
                increment: team1Points,
              },
              smallPoints: {
                increment: team1Score,
              },
            },
          },
          team2: {
            update: {
              points: {
                increment: team2Points,
              },
              smallPoints: {
                increment: team2Score,
              },
            },
          },
          playoffwinners: {
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

      const games = await ctx.prisma.playoffGames.findMany({
        where: {
          stage: nextStage,
          tournamentId: game.tournamentId,
          bracketNum: input.nextBracketNum,
        },
      });

      // Create new game
      if (games.length === 0) {
        await ctx.prisma.playoffGames.create({
          data: {
            stage: nextStage,
            team1Id: winnerTeamId,
            bracketNum: input.nextBracketNum,
            tournamentId: game.tournamentId,
            gameOrder: count !== 0 ? count + 1 : 0,
            participants: {
              connect: winnerIds,
            },
          },
        });
      }

      // Update existing game
      if (games.length === 1) {
        await ctx.prisma.playoffGames.update({
          where: {
            id: games[0]?.id,
          },
          data: {
            team2Id: winnerTeamId,
            participants: {
              connect: winnerIds,
            },
          },
        });
      }

      return { game };
    }),

  createPlayoffGame: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        games: z
          .object({
            stage: z.string(),
            gameId: z.string(),
            team: TeamZodSchema,
            bracketNum: z.number(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const games = input.games;

      for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const ids = game?.team?.participants.map((p) => {
          return { id: p.id };
        });

        await ctx.prisma.playoffGames.create({
          data: {
            gameOrder: i,
            stage: game?.stage || "",
            team1Id: game?.team?.id,
            bracketNum: game?.bracketNum || 0,
            tournamentId: input.tournamentId,
            participants: {
              connect: ids,
            },
          },
        });
      }
    }),
});
