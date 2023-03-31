import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { TeamsAttendantMapZodSchema } from "types/team.types";
import createTeamsGames from "server/api/routers/utils/createTeamsGames";

import shuffleArray from "utils/shuffleArray";
import { z } from "zod";
import filterAllPossibleTeamsGames from "./utils/filterAllPossibleTeamsGames";

const START_GROUP = "A";

export const teamsTournamentsRouter = createTRPCRouter({
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
});
