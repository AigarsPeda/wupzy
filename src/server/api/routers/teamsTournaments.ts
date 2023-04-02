import type { Participant, Team } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import createTeamsGames from "server/api/routers/utils/createTeamsGames";
import filterAllPossibleTeamsGames from "server/api/routers/utils/filterAllPossibleTeamsGames";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import type { TeamType } from "types/team.types";
import { TeamsAttendantMapZodSchema } from "types/team.types";
import createTeamsMap from "utils/createTeamsMap";
import shuffleArray from "utils/shuffleArray";
import { z } from "zod";

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

  getBestTeams: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        teamsPerGroup: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.prisma.team.findMany({
        where: {
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      const bestTeams = getBestTeams(teams, input.teamsPerGroup);
      // const playOffGames = createPlayOffGames(bestTeams);

      console.log("bestTeams --->", bestTeams);

      return { bestTeams };
    }),
});

const getBestTeams = (
  teams: (Team & {
    participants: Participant[];
  })[],
  teamsPerGroup: number
) => {
  const { teamsMap } = createTeamsMap(teams);
  const bestTeams = new Map<string, TeamType[]>();

  for (const [key, value] of teamsMap) {
    const sortedTeams = value.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    });

    bestTeams.set(key, sortedTeams.slice(0, teamsPerGroup));
  }

  return bestTeams;
};

// const createPlayOffGames = (bestTeams: Map<string, TeamType[]>) => {
//   const games: CreateGameType[] = [];
//   const groups = Array.from(bestTeams.keys());

//   // If there is only one group
//   if (groups.length < 2) {
//     for (let i = 0; i < groups.length; i++) {
//       const teams = groups[i];

//       if (!teams) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Teams not found",
//         });
//       }

//       const teams1 = bestTeams.get(teams);

//       if (!teams1) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Teams not found",
//         });
//       }

//       return createPlayOffGamsOneGroup(teams1);
//       // return createTeamsGames(teams1);
//     }
//   }

//   // check if there is an odd number of groups
//   if (groups.length % 2 === 0) {
//     for (let i = 0; i < groups.length; i++) {
//       for (let j = i + 1; j < groups.length; j++) {
//         const group1 = groups[i];
//         const group2 = groups[j];

//         if (!group1 || !group2) {
//           throw new TRPCError({
//             code: "INTERNAL_SERVER_ERROR",
//             message: "Group not found",
//           });
//         }

//         const teams1 = bestTeams.get(group1);
//         const teams2 = bestTeams.get(group2);

//         if (!teams1 || !teams2) {
//           throw new TRPCError({
//             code: "INTERNAL_SERVER_ERROR",
//             message: "Teams not found",
//           });
//         }

//         for (let k = 0; k < teams1.length; k++) {
//           for (let l = teams2.length - 1; l >= 0; l--) {
//             const teams1k = teams1[k];
//             const teams2l = teams2[l];

//             if (!teams1k || !teams2l) {
//               throw new TRPCError({
//                 code: "INTERNAL_SERVER_ERROR",
//                 message: "Team not found",
//               });
//             }

//             const game = {
//               first: {
//                 teamId: teams1k.id,
//                 participants: teams1k?.participants.map((participant) => {
//                   return {
//                     id: participant.id,
//                   };
//                 }),
//               },
//               second: {
//                 teamId: teams2l.id,
//                 participants: teams2l.participants.map((participant) => {
//                   return {
//                     id: participant.id,
//                   };
//                 }),
//               },
//             };

//             games.push(game);
//           }
//         }
//       }
//     }
//   }

//   // if there is not odd number of groups
//   if (groups.length % 2 !== 0) {
//     const allTeams: TeamType[] = [];

//     for (let i = 0; i < groups.length; i++) {
//       const group = groups[i];

//       if (!group) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Group not found",
//         });
//       }

//       const teams = bestTeams.get(group);

//       if (!teams) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Teams not found",
//         });
//       }

//       allTeams.push(...teams);
//     }

//     const sortedTeams = allTeams.sort((a, b) => {
//       if (a.points > b.points) {
//         return -1;
//       }
//       if (a.points < b.points) {
//         return 1;
//       }
//       return 0;
//     });

//     const teams1 = sortedTeams.slice(0, sortedTeams.length / 2);
//     const teams2 = sortedTeams.slice(sortedTeams.length / 2);

//     for (let i = 0; i < teams1.length; i++) {
//       for (let j = teams2.length - 1; j >= 0; j--) {
//         const teams1i = teams1[i];
//         const teams2j = teams2[j];

//         if (!teams1i || !teams2j) {
//           throw new TRPCError({
//             code: "INTERNAL_SERVER_ERROR",
//             message: "Team not found",
//           });
//         }

//         const game = {
//           first: {
//             teamId: teams1i.id,
//             participants: teams1i.participants.map((participant) => {
//               return {
//                 id: participant.id,
//               };
//             }),
//           },
//           second: {
//             teamId: teams2j.id,
//             participants: teams2j.participants.map((participant) => {
//               return {
//                 id: participant.id,
//               };
//             }),
//           },
//         };

//         games.push(game);
//       }
//     }
//   }

//   return games;
// };
