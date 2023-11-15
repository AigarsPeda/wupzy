import { ONE_TOURNAMENT_COST } from "hardcoded";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import createGamesNTimes from "~/server/api/utils/createGamesNTimes";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import filterPlayers from "~/server/api/utils/filterPlayers";
import filteredTeams from "~/server/api/utils/filteredTeams";
import {
  NewPlayerSchema,
  NewTeamsSchema,
  TournamentTypeEnum,
} from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";

export const signupLinkRouter = createTRPCRouter({
  postSignupLink: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        tournamentKind: TournamentTypeEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const signupLink = await prisma.tournamentSignupLink.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          slug: uuidv4(),
          name: input.name,
          type: input.tournamentKind,
          description: input.description,
        },
      });

      return { signupLink };
    }),

  getSignupLink: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          name: true,
          type: true,
          isActive: true,
          description: true,
        },
      });

      return { signupLink };
    }),

  getSignupLinkById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          id: input.id,
        },
        include: {
          teams: {
            include: {
              players: true,
            },
          },
          players: true,
        },
      });

      return { signupLink };
    }),

  getAllSignupLinks: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const signupLinks = await prisma.tournamentSignupLink.findMany({
      where: {
        userId: user.id,
      },
    });

    return { signupLinks };
  }),

  postPlayerToSignupLink: publicProcedure
    .input(
      z.object({
        signupLinkId: z.string(),
        teams: z.array(NewTeamsSchema),
        newPlayers: NewPlayerSchema.array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const signupLink = await prisma.tournamentSignupLink.findUnique({
        where: {
          id: input.signupLinkId,
        },
      });

      if (!signupLink) {
        throw new Error("Signup link not found");
      }

      if (!signupLink.isActive) {
        throw new Error("Signup link is not active");
      }

      if (signupLink.type === "king") {
        for (const player of filterPlayers(input.newPlayers)) {
          const newPlayer = await prisma.player.create({
            data: {
              name: player.name,
              group: player.group,
              tournamentSignupLink: {
                connect: {
                  id: signupLink.id,
                },
              },
            },
          });

          if (!newPlayer) {
            throw new Error("Player not created");
          }
        }

        return {
          status: "ok",
        };
      }

      if (signupLink.type === "teams") {
        // void (await Promise.all(
        //   filteredTeams(input.teams).map(async (team) => {
        //   await prisma.team.create({
        //     data: {
        //       name: team.name,
        //       group: team.group,
        //       tournamentSignupLink: {
        //         connect: {
        //           id: signupLink.id,
        //         },
        //       },
        //       players: {
        //         create: team.players.map((player) => ({
        //           name: player.name,
        //           group: team.group,
        //           tournamentSignupLink: {
        //             connect: {
        //               id: signupLink.id,
        //             },
        //           },
        //         })),
        //       },
        //     },
        //   });
        // }),
        // ));

        for (const team of filteredTeams(input.teams)) {
          await prisma.team.create({
            data: {
              name: team.name,
              group: team.group,
              tournamentSignupLink: {
                connect: {
                  id: signupLink.id,
                },
              },
              players: {
                create: team.players.map((player) => ({
                  name: player.name,
                  group: team.group,
                  tournamentSignupLink: {
                    connect: {
                      id: signupLink.id,
                    },
                  },
                })),
              },
            },
          });
        }

        return {
          status: "ok",
        };
      }
    }),

  postNewTournamentFromSignupLink: protectedProcedure
    .input(
      z.object({
        rounds: z.number(),
        setCount: z.number(),
        signupLinkId: z.string(),
      }),
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

      const signupLink = await prisma.tournamentSignupLink.update({
        where: {
          id: input.signupLinkId,
        },
        data: {
          isActive: false,
        },
        include: {
          players: true,
          teams: {
            include: {
              players: true,
            },
          },
        },
      });

      if (!signupLink) {
        throw new Error("Signup link not found");
      }

      if (signupLink.type === "king") {
        const { id, players } = await prisma.tournament.create({
          data: {
            kind: "PRO",
            isStarted: true,
            shareLink: uuidv4(),
            sets: input.setCount,
            type: signupLink.type,
            name: signupLink.name,
            user: {
              connect: {
                id: session.user.id,
              },
            },
            players: {
              connectOrCreate: signupLink.players.map((player) => ({
                where: {
                  id: player.id,
                  name: player.name,
                  group: player.group,
                },
                create: {
                  name: player.name,
                  group: player.group,
                },
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
      }

      if (signupLink.type === "teams") {
        const { id } = await prisma.tournament.create({
          data: {
            kind: "PRO",
            isStarted: true,
            shareLink: uuidv4(),
            sets: input.setCount,
            type: signupLink.type,
            name: signupLink.name,
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        for (const team of filteredTeams(signupLink.teams)) {
          await prisma.team.updateMany({
            where: {
              id: team.id,
            },
            data: {
              tournamentId: id,
            },
          });

          for (const player of team.players) {
            await prisma.player.updateMany({
              where: {
                id: player.id,
              },
              data: {
                tournamentId: id,
              },
            });
          }
        }

        // await Promise.all(
        //   filteredTeams(signupLink.teams).map(async (team) => {
        //     await prisma.team.updateMany({
        //       where: {
        //         id: team.id,
        //       },
        //       data: {
        //         tournamentId: id,
        //       },
        //     });

        //     team.players.forEach(async (player) => {
        //       await prisma.player.updateMany({
        //         where: {
        //           id: player.id,
        //         },
        //         data: {
        //           tournamentId: id,
        //         },
        //       });
        //     });
        //   }),
        // );

        const updatedTeams = await prisma.team.findMany({
          where: {
            tournamentId: id,
          },
          include: {
            players: true,
          },
        });

        await prisma.game.createMany({
          data: createGamesNTimes(updatedTeams, id, input.rounds),
        });

        return { id };
      }
    }),
});
